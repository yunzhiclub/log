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

  @Scheduled(cron = "0 */2 * * * *")
  public void pushDayLogSchedule() {
    System.out.println("执行推送任务");
    // 获取所有用户
    List<User> users = (List<User>) userRepository.findAll();

    for (User user : users) {
     // 获取钉钉
      Ding ding = user.getDing();
      if (ding != null) {
        logger.debug("设置推送信息");
        String message = this.setMessage();
        if (message != null) {
          // 进行推送
          dingService.dingRequest(ding, message);
        }
      }
    }
  }

  /**
   * 设置推送信息
   * 有启用的客户端离线则推送离线
   * 否则推送 "都为在线状态"
   */
  public String setMessage() {
    String message = "每日推送：" + "\n";
    boolean allOnline = true;
    List<Client> clients = clientService.getAllStartClient();
    if (clients.isEmpty()) {
      return null;
    }

    for (Client client : clients) {
      if (!client.getState()) {
        message = message.concat("客户端： " + client.getName() + "已离线" + "❗" + "\n");
        allOnline = false;
      }
    }
    if (allOnline) {
      message = message.concat("所有启用客户端都为在线状态 " + "\uD83D\uDCF6");
    }
    return message;
  }
}

