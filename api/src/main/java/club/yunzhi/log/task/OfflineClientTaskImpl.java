package club.yunzhi.log.task;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.repository.ClientRepository;
import club.yunzhi.log.repository.DingRepository;
import club.yunzhi.log.service.DingService;
import club.yunzhi.log.service.TransactionalService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfflineClientTaskImpl implements OfflineClientTask {
  private final Logger logger = LoggerFactory.getLogger(OfflineClientTaskImpl.class);

  @Autowired
  ClientRepository clientRepository;

  @Autowired
  DingRepository dingRepository;

  @Autowired
  DingService dingService;

  @Autowired
  private TransactionalService transactionalService;

  /**
   * 每隔5分钟检测一次客户端是否掉线
   */
  @Override
  @Scheduled(cron = "0 */5 * * * *")
  public void offlineReminder() {

    List<Client> clients = (List<Client>) clientRepository.findAll();

    for (Client client : clients) {
      logger.debug("判断状态是否是离线");
      if (client.getLastSendTime() != null) {
        Long timestamp = client.getLastSendTime().getTime();
        Long currentTime = System.currentTimeMillis();
        if (currentTime - timestamp > 300000 && client.getState()) {
          logger.debug("上一次响应时间超过5分钟并且为在线状态，更改状态为离线");
          Boolean state = false;
          Boolean remind = false;

          if (client.getRemind() != null && !client.getRemind()) {
            logger.debug("推送离线信息,并设置已提醒离线");
            remind = true;
            dingService.pushOffLineMessage(client);
          }
          // 更新在线状态，离线已提醒字段，加上悲观锁，防止与心跳服务造成数据覆盖
          transactionalService.setClientStateAndRemindWithPessimisticLock(client.getId(), state, remind);
        }
      }
    }
  }
}
