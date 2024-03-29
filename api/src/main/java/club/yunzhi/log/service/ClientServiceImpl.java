package club.yunzhi.log.service;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.DayLog;
import club.yunzhi.log.entity.Ding;
import club.yunzhi.log.entity.Log;
import club.yunzhi.log.enums.LogLevelEnum;
import club.yunzhi.log.repository.ClientRepository;
import club.yunzhi.log.repository.DayLogRepository;
import club.yunzhi.log.repository.DingRepository;
import club.yunzhi.log.repository.LogRepository;
import club.yunzhi.log.repository.specs.ClientSpecs;
import club.yunzhi.log.repository.specs.DingSpecs;
import com.mengyunzhi.core.service.CommonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

/**
 * @author panjie
 */
@Service
public class ClientServiceImpl implements ClientService {
  private final Logger logger = LoggerFactory.getLogger(ClientServiceImpl.class);
  @Autowired
  private final ClientRepository clientRepository;

  @Autowired
  LogRepository logRepository;

  @Autowired
  DayLogRepository dayLogRepository;

  @Autowired
  DingRepository dingRepository;

  @Autowired
  DingService dingService;

  @Autowired
  private TransactionalService transactionalService;

  @Autowired
  public ClientServiceImpl(ClientRepository clientRepository) {
    this.clientRepository = clientRepository;
  }

  @Override
  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public Client getOneSavedClient() {
    return clientRepository.save(this.getOneUnsavedClient());
  }

  @Override
  public Client getOneUnsavedClient() {
    Client client = new Client();
    client.setName("test");
    client.setToken(CommonService.getRandomStringByLength(40));
    return client;
  }

  @Override
  public Page<Client> page(String name, Pageable pageable) {
    Page<Client> clients = clientRepository.findAll(ClientSpecs.containingName(name), pageable);
    for (Client client : clients.getContent()) {
      client.setToken(ClientService.encodeToken(client.getToken()));
    }

    return clients;
  }

  @Override
  public Client findById(Long id) {
    return this.clientRepository.findById(id).get();
  }

  @Override
  public Client save(Client client) {
    client.setLastSendTime(null);
    client.setLastStartTime(null);
    DayLog dayLog = new DayLog();
    client.setTodayLog(dayLog);
    client.getTodayLog().setClient(client);
    Client client1 = clientRepository.save(client);
//    DayLog dayLog1 = dayLogRepository.save(dayLog);
//
//    client1.setTodayLog(dayLog1);
//    clientRepository.save(client1);
    return client1;
  }

  @Override
  public Client update(Long id, Client client) {
    Client oldClient = this.clientRepository.findById(id).get();
    oldClient.setName(client.getName());
    oldClient.setToken(client.getToken());
    oldClient.setDescription(client.getDescription());
    oldClient.setUrl(client.getUrl());
    return this.clientRepository.save(oldClient);
  }

  @Override
  public void deleteById(Long id) {
    logger.debug("首先获取对应的客户端");
    Client client = findById(id);
//
//    logger.debug("删除该客户端的日志和机器人和dayLog");
//    dayLogRepository.deleteAllByClient(client);
//    dingRepository.deleteAllByClient(client);
//    logRepository.deleteAllByClient(client);

    logger.debug("删除客户端");
    this.clientRepository.deleteById(id);
  }

  @Override
  public boolean existByToken(String token) {
    Client client = this.clientRepository.findByToken(token);
    if (client == null) {
      return false;
    } else {
      return true;
    }
  }

  @Override
  public void clean(Long clientId, Timestamp timestamp) {
    logger.debug("首先获取客户端");
    Client client = this.findById(clientId);
    logger.debug("首先获取日志");
    logRepository.deleteAllByTimestampIsLessThanAndClient(timestamp, client);

    logger.debug("删除今日日志");
    dayLogRepository.deleteAllByDayIsLessThanAndClient(timestamp, client);
  }

  @Override
  public void startOrEnd (Long id) {
    Client client = this.findById(id);
    logger.debug("改变客户端的启用状态");
    // 在null 或者 停用时设置为ture, 否则为false
    client.setStart(client.getStart() == null || !client.getStart());

    clientRepository.save(client);
  }

  @Override
  @Async
  public void update(List<Log> logs) {
    if (logs.size() > 0) {
      Timestamp lastStartTime = null;

      int infoCount = 0;
      int warnCount = 0;
      int errorCount = 0;
      for (Log log : logs) {
        if (log.getLevelCode().equals(LogLevelEnum.INFO.getValue())) {
          infoCount++;
          Timestamp lastStartTimeTmp = this.getLastStartTime(log);
          if (lastStartTimeTmp != null) {
            lastStartTime = lastStartTimeTmp;
          }
        } else if (log.getLevelCode().equals(LogLevelEnum.WARN.getValue())) {
          warnCount++;
        } else if (log.getLevelCode().equals(LogLevelEnum.ERROR.getValue())) {
          errorCount++;
        }
      }
      Client client1 = clientRepository.findById(logs.get(0).getClient().getId()).get();
      client1.setLastSendTime(new Timestamp(System.currentTimeMillis()));
      if (client1.getTodayLog() == null || !client1.getTodayLog().isToday()) {
        client1.setTodayLog(this.getDayLog(client1));
      }
      client1.getTodayLog().addErrorCount(errorCount);
      client1.getTodayLog().addWarnCount(warnCount);
      client1.getTodayLog().addInfoCount(infoCount);
      if (lastStartTime != null) {
        client1.setLastStartTime(lastStartTime);
      }
      clientRepository.save(client1);
    }
  }

  @Override
  public List<Client> getAllStartClient() {
    logger.debug("获取所有状态为启用的客户端");
    List<Client> clients = (List<Client>) clientRepository.findAll(ClientSpecs.isStart(true));
    return clients;
  }

  /**
   * 获取最后的启动时间
   *
   * @param log 日志
   * @return
   */
  private Timestamp getLastStartTime(Log log) {
    if (log.getMessage().startsWith("Starting Servlet engine")) {
      System.out.println(log.getTimestamp());
      return log.getTimestamp();
    }
    return null;
  }

  /**
   * 返回客户端的今日日志
   * 如果不存在则新建
   * @param client client
   */
  private DayLog getDayLog(Client client) {
    DayLog dayLog = dayLogRepository.findByClientId(client.getId());
    if (dayLog == null) {
      dayLog = new DayLog(client);
      dayLog = dayLogRepository.save(dayLog);
    }
    return dayLog;
  }
}
