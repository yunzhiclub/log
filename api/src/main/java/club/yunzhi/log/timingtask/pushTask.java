package club.yunzhi.log.timingtask;


import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author jincheng
 */
//执行定时推送任务
@Component
public class pushTask {
    Date currentTime = new Date();
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String dateString = formatter.format(currentTime);
    @Scheduled(cron = "${time.cron}")
    public void runTask(){
        System.out.println("执行定时任务" + dateString);
    }
}

