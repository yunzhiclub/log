package club.yunzhi.log.Schedule;


import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.DayLog;
import club.yunzhi.log.entity.Ding;
import club.yunzhi.log.entity.User;
import club.yunzhi.log.repository.DayLogRepository;
import club.yunzhi.log.repository.UserRepository;
import club.yunzhi.log.service.ClientService;
import club.yunzhi.log.service.DingServiceImpl;
import club.yunzhi.log.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @author jincheng
 */
//执行定时推送任务
@Component
public class PushDayLogSchedule {
  private final DayLogRepository dayLogRepository;
  private final Logger logger = LoggerFactory.getLogger(PushDayLogSchedule.class);

  DingServiceImpl dingService = new DingServiceImpl();

  @Autowired
  UserRepository userRepository;

  @Autowired
  ClientService clientService;

  public PushDayLogSchedule(DayLogRepository dayLogRepository) {
    this.dayLogRepository = dayLogRepository;
  }

  @Scheduled(cron = "${time.cron}")
  public void pushDayLogSchedule() throws ParseException {
    System.out.println("执行推送任务");
    // 获取所有用户
    List<User> users = (List<User>) userRepository.findAll();

    for (User user : users) {
     // 获取钉钉
      Ding ding = user.getDing();
      if (ding != null) {
        logger.debug("设置在线信息");
        String message = this.setOnlineMessage();
        logger.debug("设置日志信息");
        message = message.concat(this.setLogMessage());

        // 进行推送
        dingService.dingRequest(ding, message);
      }
    }
  }

  /**
   * 设置在线信息
   * 有启用的客户端离线则推送离线
   * 否则推送 "都为在线状态"
   */
  public String setOnlineMessage() {
    String message = "日常推送：";
    boolean allOnline = true;
    List<Client> clients = clientService.getAllStartClient();
    if (clients.isEmpty()) {
      return message.concat("\n无启用的客户端\n");
    }

    for (Client client : clients) {
      if (!client.getState()) {
        if (allOnline) {
          message = message.concat("❗\n" + "离线客户端\t\t\t\t\t\t\t\t" + "最后交互" + "\n");
        }
        Timestamp  lastSendTime = client.getLastSendTime();
        message = message.concat( client.getName() + "\t\t" + lastSendTime + "\n");
        allOnline = false;
      }
    }
    if (allOnline) {
      message = message.concat( "\uD83D\uDCF6" + "\n" + "所有启用客户端都为在线状态 "  + "\n");
    }
    return message;
  }


  /**
   * 设置所有启用客户端昨日日志信息
   */
  public String setLogMessage() throws ParseException {
    String message = "\n昨日日志数：\n" + "" +  "客户端   INFO " + " WARN " + " ERROR \n";

    List<Client> clients = clientService.getAllStartClient();
    if (clients.isEmpty()) {
      return message.concat("无启用的客户端");
    }

    for (Client client : clients) {
      DayLog dayLog = dayLogRepository.getLogOfYesterdayWithClientId(client.getId());
      if (dayLog != null) {
        String name = dayLog.getClient().getName();
        Long infoCount= dayLog.getInfoCount();
        Long errorCount = dayLog.getErrorCount();
        Long warnCount = dayLog.getWarnCount();
        message = message.concat( name + "\t\t\t" +
                infoCount + "\t\t" +
                warnCount + "\t\t" +
                errorCount + "\n");

      }
    }
    return  message;
  }
}

