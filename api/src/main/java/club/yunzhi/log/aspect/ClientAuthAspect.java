package club.yunzhi.log.aspect;

import club.yunzhi.log.entity.Client;
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
     * 环绕切入。只有环绕切入，才能改变参数中的值
     * @param joinPoint 切点
     * @throws Throwable 执行异常（可能参数不一致)
     */
    @Around("execution(* club.yunzhi.log.controller.LogController.*(..))")
    public void getClientInfo(final ProceedingJoinPoint joinPoint) throws Throwable {
        logger.debug("获取是否注入了client");
        Object[] args = joinPoint.getArgs();
        for (int i = 0; i < args.length; i++) {
            if (args[i] instanceof Client) {
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
                args[i] = client;
                break;
            }
        }

        logger.debug("执行proceed");
        joinPoint.proceed(args);
    }
}
