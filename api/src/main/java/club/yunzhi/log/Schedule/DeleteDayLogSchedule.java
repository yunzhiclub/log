package club.yunzhi.log.Schedule;

import club.yunzhi.log.service.DayLogService;
import club.yunzhi.log.service.DingServiceImpl;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 定时删除三个月前的日志信息
 * @author jincheng
 */
@Component
public class DeleteDayLogSchedule {
    private final DayLogService dayLogService;
    private String message;
    Date currentTime = new Date();
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String dateString = formatter.format(currentTime);
    DingServiceImpl dingService = new DingServiceImpl();
    public DeleteDayLogSchedule(DayLogService dayLogService) {
        this.dayLogService = dayLogService;
    }

    @Scheduled(cron = "${time.cron}")
    public void deleteLogSchedule(){
        if (dayLogService.getDayLogOfThreeMonth().isEmpty()){
            this.message = "今日没有要删除的日志信息";
        }else {
            dayLogService.deleteDayLogOfThreeMonth();
                this.message = "今日要删除的日志信息删除完成";
        }
        dingService.dingRequest("执行定时删除任务" + dateString + message);
        System.out.println("执行定时删除任务" + dateString + message);
    }
}
