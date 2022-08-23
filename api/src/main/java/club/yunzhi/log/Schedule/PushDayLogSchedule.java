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

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author jincheng
 */
//执行定时推送任务
@Component
public class PushDayLogSchedule {
  private final DayLogRepository dayLogRepository;
  private static final Logger logger = LoggerFactory.getLogger(PushDayLogSchedule.class);

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

        // 设置ip信息
        String currentHostIpaddress;
        try {
          currentHostIpaddress = PushDayLogSchedule.getCurrentHostIpaddress();
        } catch (RuntimeException exception) {
          currentHostIpaddress = "";
        }
        message = message.concat("\n\n当前服务器ip: " + currentHostIpaddress + "\n");

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


  /**
   * 获取当前主机公网IP
   */
  public static String getCurrentHostIpaddress() {
    // 这里使用jsonip.com第三方接口获取本地IP
    String jsonip = "https://jsonip.com/";
    // 接口返回结果
    StringBuilder result = new StringBuilder();
    BufferedReader in = null;
    try {
      // 使用HttpURLConnection网络请求第三方接口
      URL url = new URL(jsonip);
      HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
      urlConnection.setRequestMethod("GET");
      urlConnection.connect();
      in = new BufferedReader(new InputStreamReader(
              urlConnection.getInputStream()));
      String line;
      while ((line = in.readLine()) != null) {
        result.append(line);
      }
    } catch (Exception e) {
      e.printStackTrace();
      logger.error("网络错误");
      throw new RuntimeException("网络错误");
    }
    // 使用finally块来关闭输入流
    finally {
      try {
        if (in != null) {
          in.close();
        }
      } catch (Exception e2) {
        e2.printStackTrace();
      }
    }
    // 正则表达式，提取xxx.xxx.xxx.xxx，将IP地址从接口返回结果中提取出来
    String rexp = "(\\d{1,3}\\.){3}\\d{1,3}";
    Pattern pat = Pattern.compile(rexp);
    Matcher mat = pat.matcher(result.toString());
    String res = "";
    if (mat.find()) {
      res = mat.group();
    }
    return res;
  }

}

