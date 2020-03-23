package club.yunzhi.log.timingtask;


import club.yunzhi.log.service.DayLogService;
import club.yunzhi.log.service.DingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalTime;


/**
 * @author jincheng
 */
//执行定时推送任务
@Component
public class pushTask {
    DingServiceImpl dingService = new DingServiceImpl();
    //调用该Service的方法查找和删除日志信息
    private final DayLogService dayLogService;
    //是否删除日志信息都的反馈
    private String message;
    @Autowired
    public pushTask(DayLogService dayLogService) {
        this.dayLogService = dayLogService;
    }

    @Scheduled(cron = "${time.pushcron}")
    public void runTask(){
        LocalTime localTime = LocalTime.now();
        if(dayLogService.getData().isEmpty())
        {
            this.message = "今日没有要删除的日志信息";
        }
        else {
            if(  dayLogService.delete())
            {
                System.out.println(dayLogService.delete());
                this.message = "今日要删除的日志信息删除成功";
            }
            else {
                this.message = "今日要删除的日志信息删除失败";
            }
        }
        dingService.dingRequest(message +"日志推送"+localTime);
        System.out.println("执行定时任务" + localTime);
    }
//    @Scheduled(cron="*/${time.interval} * * * * *")
//    void run() {
//        Instant timestamp = Instant.now();
//        System.out.println("每五秒执行 " + timestamp);
//    }
}

