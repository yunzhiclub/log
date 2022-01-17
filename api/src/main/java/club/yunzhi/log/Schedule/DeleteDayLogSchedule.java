package club.yunzhi.log.Schedule;

import club.yunzhi.log.repository.DingRepository;
import club.yunzhi.log.repository.LogRepository;
import club.yunzhi.log.service.DayLogService;
import club.yunzhi.log.service.DingServiceImpl;
import club.yunzhi.log.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 定时删除三个月前的日志信息
 *
 * @author jincheng
 */
@Component
public class DeleteDayLogSchedule {
    private final LogService logService;
    private String message;
    Date currentTime = new Date();
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
    String dateString = formatter.format(currentTime);
    DingServiceImpl dingService = new DingServiceImpl();

    public DeleteDayLogSchedule(LogService logService) {
        this.logService = logService;
    }

    @Scheduled(cron = "${time.cron}")
    public void deleteLogSchedule() throws ParseException {
        if (logService.getLogOfThreeMonth().isEmpty()) {
            this.message = "今日没有要删除的日志信息";
        } else {
            logService.deleteLogOfThreeMonth();
            this.message = "今日要删除的日志信息删除完成";
        }
        dingService.dingRequest("执行定时删除任务" + "\n" + dateString + "\n" + message);
        System.out.println("执行定时删除任务" + "\n" + dateString + "\n" + message);
    }
}
