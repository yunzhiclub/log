package club.yunzhi.log.task;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.DayLog;
import club.yunzhi.log.entity.Ding;
import club.yunzhi.log.entity.User;
import club.yunzhi.log.repository.ClientRepository;
import club.yunzhi.log.repository.DayLogRepository;
import club.yunzhi.log.repository.DingRepository;
import club.yunzhi.log.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Init implements ApplicationListener<ContextRefreshedEvent>, Ordered {
  private final static Logger logger = LoggerFactory.getLogger(Init.class);
  private static String webHook = "https://oapi.dingtalk.com/robot/send?access_token=deca5f757bf7734f8b8b223fcac0e2d776b4750a40166617970e982ea79d761f";
  //密钥
  private static String secret = "SEC1ae6440b09750b652159bd2e742beda2c34a8653d25de9284c9daeb984aaff9a";


  @Autowired
  private ClientRepository clientRepository;
  @Autowired
  private DayLogRepository dayLogRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private DingRepository dingRepository;

  @Override
  public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
    Long count = dingRepository.count();

    if (clientRepository.count() == 0) {
      Client client = new Client();
      client.setName("测试");
      client.setToken("gJ1bH9dE2zF7zO7nH1fE3gJ4iF5sW5aP");
      clientRepository.save(client);
    }


    if (count == 0 ) {
      Ding ding = new Ding();
      ding.setSecret(secret);
      ding.setWebHook(webHook);
      List<Client> clients = (List<Client>) clientRepository.findAll();
      ding.setClient(clients.get(0));
      dingRepository.save(ding);
    }

    if (userRepository.count() == 0) {
      logger.debug("初始化用户");
      User user = new User();
      user.setPassword("yunzhi");
      user.setUsername("testUser1");
      userRepository.save(user);
    }

    logger.info("初始化客户端");
    List<Client> clients = (List<Client>) clientRepository.findAll();
    for (Client client : clients) {
      if (client.getTodayLog() == null || !client.getTodayLog().isToday()) {
        DayLog dayLog = new DayLog(client);
        client.setTodayLog(dayLog);
        dayLogRepository.save(dayLog);
      }
      logger.debug("判断客户端状态是否正确");
      Long timestamp = client.getLastSendTime().getTime();
      Long currentTime = System.currentTimeMillis();
      if(currentTime - timestamp > 300000) {
        logger.debug("上一次响应时间超过5分钟，更改状态为离线");
        client.setState(false);
      }
    }

    clientRepository.saveAll(clients);
  }

  @Override
  public int getOrder() {
    return 0;
  }
}
