package club.yunzhi.log.aspect;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.Log;
import club.yunzhi.log.repository.ClientRepository;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
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

  @Autowired
  public ClientAuthAspect(HttpServletRequest httpServletRequest, ClientRepository clientRepository) {
    this.httpServletRequest = httpServletRequest;
    this.clientRepository = clientRepository;
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
    joinPoint.proceed();
  }
}
