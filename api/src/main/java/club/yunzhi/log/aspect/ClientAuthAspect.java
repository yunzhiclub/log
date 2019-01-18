package club.yunzhi.log.aspect;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.repository.ClientRepository;
import org.apache.tomcat.websocket.AuthenticationException;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
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

    @Around("execution(* club.yunzhi.log.controller.LogController.save(..))")
    public void getClientInfo(final ProceedingJoinPoint joinPoint) throws Throwable {

        String[] tokens = httpServletRequest.getParameterValues("token");

        if (tokens == null) {
            throw new club.yunzhi.log.exception.AuthException("do not received auth token");
        }

        Client client = clientRepository.findByToken(tokens[0]);
        if (client == null) {
            throw new club.yunzhi.log.exception.AuthException("auth token incorrect");
        }

        Object[] args = joinPoint.getArgs();

        for (Object arg : args) {
            if (arg instanceof Client) {
                arg = client;
            }
        }

        joinPoint.proceed(args);
    }
}
