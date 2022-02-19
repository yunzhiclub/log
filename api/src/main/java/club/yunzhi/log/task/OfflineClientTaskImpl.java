package club.yunzhi.log.task;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.Ding;
import club.yunzhi.log.repository.ClientRepository;
import club.yunzhi.log.repository.DingRepository;
import club.yunzhi.log.service.DingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
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

  /**
   * 每隔1分钟检测一次客户端是否掉线
   */
  @Override
  @Scheduled(cron = "0 */1 * * * *")
  public void offlineReminder() {

    List<Client> clients = (List<Client>) clientRepository.findAll();

    for (Client client : clients) {
      logger.debug("判断状态是否是离线");

      if (client.getLastSendTime() != null) {
        Long timestamp = client.getLastSendTime().getTime();
        Long currentTime = System.currentTimeMillis();
        if (currentTime - timestamp > 300000) {
          logger.debug("上一次响应时间超过5分钟，更改状态为离线");
          client.setState(false);

          logger.debug("如果该客户端离线未提醒,向钉钉发送离线信息");
          if (!client.getRemind()) {
            List<Ding> dings = dingService.getAllStartDing();
            logger.debug("执行推送任务");
            for (Ding ding : dings) {
              if (ding.getClient().getId().equals(client.getId())) {
                client.setRemind(true);
                Date currentTime1 = new Date();
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String dateString = formatter.format(currentTime1);
                dingService.dingRequest(ding, "执行推送任务" + "\n" + dateString + "\n"
                        + ding.getName() + "机器人提示: 客户端" + client.getName() + "已经离线");
              }
            }
          }
          clientRepository.save(client);
        }
      }
    }

    clientRepository.saveAll(clients);
  }
}
