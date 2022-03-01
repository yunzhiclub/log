package club.yunzhi.log.aspect;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.Ding;
import club.yunzhi.log.entity.Log;
import club.yunzhi.log.repository.ClientRepository;
import club.yunzhi.log.service.DingService;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @author panjie
 * 客户端认证
 */
@Aspect
@Component
public class ClientAuthAspect {
  private final static Logger logger = LoggerFactory.getLogger(ClientAuthAspect.class);

  private final
  HttpServletRequest httpServletRequest;
  private final ClientRepository clientRepository;



  private final DingService dingService;

  @Autowired
  public ClientAuthAspect(HttpServletRequest httpServletRequest, ClientRepository clientRepository, DingService dingService) {
    this.httpServletRequest = httpServletRequest;
    this.clientRepository = clientRepository;
    this.dingService = dingService;
  }

  /**
   * 切入batchSave,根据token获取客户端信息
   */
  @Around("execution(* club.yunzhi.log.controller.LogController.batchSave(..)) && args(logs)")
  public void getClientInfo(final ProceedingJoinPoint joinPoint, List<Log> logs) throws Throwable {

    logger.debug("获取token, 并验证");
    String[] tokens = httpServletRequest.getParameterValues("token");
    if (tokens == null) {
      throw new club.yunzhi.log.exception.AuthException("do not received auth token");
    }

    logger.debug("根据token获取client");
    Client client = clientRepository.findByToken(tokens[0]);
    if (client == null) {
      throw new club.yunzhi.log.exception.AuthException("auth token incorrect");
    }
    logs.forEach(log -> log.setClient(client));

    logger.debug("设置客户端的状态为在线");
    if (!client.getState()) {
      client.setState(true);
      List<Ding> dings = this.dingService.getAllStartDing();

      logger.debug("执行推送任务");
      for (Ding ding : dings) {
        if (ding.getClient().getId().equals(client.getId())) {
          Date currentTime1 = new Date();
          SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
          String dateString = formatter.format(currentTime1);
          dingService.dingRequest(ding, "执行推送任务" + "\n" + dateString + "\n"
                  + ding.getName() + "机器人提示: 客户端" + client.getName() + "已上线");
        }
      }
      client.setRemind(false);
      clientRepository.save(client);
    }
    joinPoint.proceed();
  }
}
