package club.yunzhi.log.task;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.DayLog;
import club.yunzhi.log.repository.ClientRepository;
import club.yunzhi.log.repository.DayLogRepository;
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

    @Autowired private ClientRepository clientRepository;
    @Autowired private DayLogRepository dayLogRepository;
    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        logger.info("初始化客户端");
        List<Client> clients = (List<Client>) clientRepository.findAll();
        for (Client client: clients) {
            if (client.getTodayLog() == null || !client.getTodayLog().isToday()) {
                DayLog dayLog = new DayLog(client);
                client.setTodayLog(dayLog);
                dayLogRepository.save(dayLog);
            }
        }

        clientRepository.saveAll(clients);
    }

    @Override
    public int getOrder() {
        return 0;
    }
}