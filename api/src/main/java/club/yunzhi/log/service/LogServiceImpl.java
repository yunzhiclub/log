package club.yunzhi.log.service;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.DayLog;
import club.yunzhi.log.entity.Ding;
import club.yunzhi.log.entity.Log;
import club.yunzhi.log.enums.LogLevelEnum;
import club.yunzhi.log.repository.ClientRepository;
import club.yunzhi.log.repository.LogRepository;
import com.mengyunzhi.core.service.CommonService;
import com.mengyunzhi.core.service.YunzhiService;
import com.mengyunzhi.core.service.YunzhiServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
 * @author panjie
 */
@Service
public class LogServiceImpl implements LogService {
    private final
    LogRepository logRepository;
    @Autowired
    ClientService clientService;
    @Autowired
    private DingService dingService;
    private final ClientRepository clientRepository;
    private final static Logger logger = LoggerFactory.getLogger(LogServiceImpl.class);

    private final static String[] excludeSuffixes = {
            "org.apache.catalina.core.ContainerBase.[Tomcat].",
            "org.apache.catalina.core.StandardService",
            "org.flywaydb.core.internal",
            "org.hibernate",
            "org.springframework.beans.factory.support.DefaultListableBeanFactory",
            "org.springframework.boot.actuate",
            "org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainer",
            "org.springframework.boot.context.embedded.AnnotationConfigEmbeddedWebApplicationContext",
            "org.springframework.boot.web.servlet.FilterRegistrationBean",
            "org.springframework.boot.web.servlet.ServletRegistrationBean",
            "org.springframework.boot.web.servlet.DelegatingFilterProxyRegistrationBean",
            "org.springframework.context.support.DefaultLifecycleProcessor",
            "org.springframework.context.support.PostProcessorRegistrationDelegate$BeanPostProcessorChecker",
            "org.springframework.data.repository.config.RepositoryConfigurationDelegate",
            "org.springframework.data.rest.webmvc",
            "org.springframework.jmx.export.annotation.AnnotationMBeanExporter",
            "org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean",
            "org.springframework.scheduling.annotation.ScheduledAnnotationBeanPostProcessor",
            "org.springframework.security.web.DefaultSecurityFilterChain",
            "org.springframework.web.context.ContextLoader",
            "org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping",
            "org.springframework.web.servlet.handler.SimpleUrlHandlerMapping",
            "org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter",
            "org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExceptionResolver",
    };

    private YunzhiService<Log> yunzhiService;

    @Autowired
    public LogServiceImpl(LogRepository logRepository, ClientRepository clientRepository) {
        this.logRepository = logRepository;
        this.yunzhiService = new YunzhiServiceImpl();
        this.clientRepository = clientRepository;
    }

    /**
     * 保存
     *
     * @param log    日志
     * @param client 客户端
     * @return 日志
     */
    @Override
    public Log save(Log log, Client client) {
        if (log.getMessage() == null || log.getMessage() == "") {
            Client client1 = clientRepository.findById(log.getClient().getId()).get();
            client1.setLastSendTime(new Timestamp(System.currentTimeMillis()));
            logger.debug("更新最后交互时间");
            clientRepository.save(client1);
            logger.debug("移除心跳包");
            return null;
        }
        log.setClient(client);
        return logRepository.save(log);
    }

    /**
     * 批量保存
     *
     * @param logs 日志list
     */
    @Override
    @Async
    public void save(List<Log> logs) {
        logger.debug("过滤数据");
        this.filter(logs);
        logRepository.saveAll(logs);

        logger.debug("添加附加数据");
        clientService.update(logs);
    }

    private void filter(List<Log> logs) {
        Iterator<Log> logIterator = logs.iterator();
        while (logIterator.hasNext()) {
            Log log = logIterator.next();
            if (log.getLevelCode().compareTo(LogLevelEnum.INFO.getValue()) < 0) {
                // 移除日志等级为trace或debug的
                logIterator.remove();
            } else if (log.getMessage() == null || log.getMessage() == "") {
                //移除心跳包
                Client client = clientRepository.findById(log.getClient().getId()).get();
                client.setLastSendTime(new Timestamp(System.currentTimeMillis()));
                clientRepository.save(client);
                logger.debug("更新最后交互时间为" + client.getLastSendTime());
                logIterator.remove();
                logger.debug("移除心跳包");
            } else if (log.getLevelCode().compareTo(LogLevelEnum.INFO.getValue()) == 0) {
                // 移除一些系统启动信息
                for (String excludeSuffix :
                        excludeSuffixes) {
                    if (log.getLogger().startsWith(excludeSuffix)) {
                        logIterator.remove();
                        break;
                    }
                }
            } else if (log.getLevelCode().equals(LogLevelEnum.ERROR.getValue())) {
                // 提醒客户端出现了error
                Client client = log.getClient();
                logger.debug("提醒客户端出现了error");
                List<Ding> dings = this.dingService.getAllStartDing();
                for (Ding ding : dings) {
                    if(ding.getClient().getId().equals(log.getClient().getId())) {
                        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                        String dateString = formatter.format(new Date());
                        dingService.dingRequest(ding, "执行推送任务" + "\n" + dateString + "\n" + ("客户端: " + client.getName() + "  出现了ERROR"));
                    }
                }
            }
        }
    }

    @Override
    public Page<Log> page(Long clientId, String level, String message, Pageable pageable) {
        Page<Log> page = logRepository.getAll(clientId, level, message, pageable);
        return page;
    }

    @Override
    public List<Log> getLogOfThreeMonth() throws ParseException {
        return logRepository.getLogOfThreeMonth();
    }

    @Override
    public void deleteLogOfThreeMonth() throws ParseException {
        logRepository.deleteLogOfThreeMonth();
    }
}
