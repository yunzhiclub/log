package club.yunzhi.log.Schedule;


import club.yunzhi.log.repository.ClientRepository;
import club.yunzhi.log.service.DingServiceImpl;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author jincheng
 */
//执行定时推送任务
@Component
public class PushDayLogSchedule {
    private final
    ClientRepository clientRepository;

    Date currentTime = new Date();
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String dateString = formatter.format(currentTime);
    DingServiceImpl dingService = new DingServiceImpl();

    public PushDayLogSchedule(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Scheduled(cron = "${time.cron}")
    public void pushDayLogSchedule(){
        dingService.dingRequest("执行定时推送任务" + dateString);
        System.out.println("执行定时推送任务" + dateString);
    }
}

