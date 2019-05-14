package club.yunzhi.log.task;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.DayLog;
import club.yunzhi.log.repository.ClientRepository;
import club.yunzhi.log.repository.DayLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DayLogTaskImpl implements DayLogTask {
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    DayLogRepository dayLogRepository;


    /**
     * 每日00:00:01生成当天的信息
     */
    @Override
    @Scheduled(cron = "1 0 0 * * *")
    public void generateTodayDayLog() {
        List<Client> clients = (List<Client>) clientRepository.findAll();

        for(Client client : clients) {
            DayLog dayLog = new DayLog(client);
            dayLogRepository.save(dayLog);
            client.setTodayLog(dayLog);
        }

        clientRepository.saveAll(clients);
    }
}
