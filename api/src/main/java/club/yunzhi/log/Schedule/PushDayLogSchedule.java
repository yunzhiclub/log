package club.yunzhi.log.Schedule;


import club.yunzhi.log.entity.DayLog;
import club.yunzhi.log.repository.DayLogRepository;
import club.yunzhi.log.service.DingServiceImpl;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author jincheng
 */
//执行定时推送任务
@Component
public class PushDayLogSchedule {
    private final DayLogRepository dayLogRepository;

    Date currentTime = new Date();
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String dateString = formatter.format(currentTime);
    Long INFOCount;
    Long ErrorCount;
    Long WARNCount;
    Time LastSendTime;
    List messages = new ArrayList<String>();
    String message;
    String ClientName;
    DingServiceImpl dingService = new DingServiceImpl();

    public PushDayLogSchedule(DayLogRepository dayLogRepository) {
        this.dayLogRepository = dayLogRepository;
    }

    @Scheduled(cron = "${time.cron}")
    public void pushDayLogSchedule() {
        List<DayLog> dayLogs = dayLogRepository.getLogOfYesterday();
        for (DayLog dayLog : dayLogs) {
            this.ClientName = dayLog.getClient().getName();
            this.LastSendTime = dayLog.getClient().getLastSendTime();
            this.INFOCount = dayLog.getInfoCount();
            this.ErrorCount = dayLog.getErrorCount();
            this.WARNCount = dayLog.getWarnCount();
            this.message = "客户端: " + this.ClientName + "\n"
                    + "最后交互时间:  " + this.LastSendTime + "\n"
                    + "昨日INFO数:   " + this.INFOCount + "\n"
                    + "昨日ERROR数:  " + this.ErrorCount + "\n"
                    + "昨日WARN数:   " + this.WARNCount + "\n";
            this.messages.add(message);
        }
        StringBuffer resultBuffer = new StringBuffer();
        for (int i = 0; i < messages.size(); i++) {
            String result = messages.get(i).toString();
            if (i == 0) {
                resultBuffer.append(result);
            } else {
                resultBuffer.append("\n" + result);
            }
        }
        String messageOfLog = resultBuffer.toString();
        dingService.dingRequest("执行定时推送任务" + "\n" + dateString + "\n" + messageOfLog);
        System.out.println("执行定时推送任务" + dateString + messageOfLog);
    }
}

