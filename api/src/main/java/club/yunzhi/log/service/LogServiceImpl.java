package club.yunzhi.log.service;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.DayLog;
import club.yunzhi.log.entity.Log;
import club.yunzhi.log.enums.LogLevelEnum;
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

import java.text.ParseException;
import java.util.Iterator;
import java.util.List;

/**
 * @author panjie
 */
@Service
public class LogServiceImpl implements LogService {
    private final
    LogRepository logRepository;
    @Autowired ClientService clientService;

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
    public LogServiceImpl(LogRepository logRepository) {
        this.logRepository = logRepository;
        this.yunzhiService = new YunzhiServiceImpl();
    }

    /**
     * 保存
     * @param log 日志
     * @param client 客户端
     * @return 日志
     */
    @Override
    public Log save(Log log, Client client) {
        log.setClient(client);
        return logRepository.save(log);
    }

    /**
     * 批量保存
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
               // 移除日志等级为info或debug的
               logIterator.remove();
           } else if (log.getLevelCode().compareTo(LogLevelEnum.INFO.getValue()) == 0) {
               // 移除一些系统启动信息
               for (String excludeSuffix :
                       excludeSuffixes) {
                   if (log.getLogger().startsWith(excludeSuffix)) {
                       logIterator.remove();
                       break;
                   }
               }
           }
        }
    }

    @Override
    public Page<Log> page(Long clientId, Pageable pageable) {
        Log log = (Log) CommonService.getNullFieldsObject(Log.class);
        if (clientId != null) {
            log.setClient(new Client(clientId));
        }

        return yunzhiService.page(logRepository, log, pageable);
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
