package club.yunzhi.log.Schedule;


import club.yunzhi.log.entity.DayLog;
import club.yunzhi.log.entity.Ding;
import club.yunzhi.log.repository.DayLogRepository;
import club.yunzhi.log.repository.DingRepository;
import club.yunzhi.log.service.DingServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Time;
import java.sql.Timestamp;
import java.text.ParseException;
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
  private final Logger logger = LoggerFactory.getLogger(PushDayLogSchedule.class);

  Date currentTime = new Date();
  SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
  String dateString = formatter.format(currentTime);
  Long INFOCount;
  Long ErrorCount;
  Long WARNCount;
  Timestamp LastSendTime;
  List messages = new ArrayList<String>();
  String message;
  String ClientName;
  DingServiceImpl dingService = new DingServiceImpl();

  public PushDayLogSchedule(DayLogRepository dayLogRepository) {
    this.dayLogRepository = dayLogRepository;
  }

  //  @Scheduled(cron = "${time.cron}")
  @Scheduled(initialDelay = 1000, fixedRate = 50000)
  public void pushDayLogSchedule() throws ParseException {
    System.out.println("执行推送任务");
    logger.debug("首先获取所有的钉钉");
    List<Ding> dings = dingService.getAllStartDing();

    for (Ding ding : dings) {
      DayLog dayLog = dayLogRepository.getLogOfYesterdayWithClientId(ding.getClient().getId());
      if (dayLog != null) {
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
        StringBuffer resultBuffer = new StringBuffer();
        String result = message;
        resultBuffer.append(result);
        String messageOfLog = resultBuffer.toString();
        dingService.dingRequest(ding, "执行定时推送任务" + "\n" + dateString + "\n" + messageOfLog);
        System.out.println("执行定时推送任务" + dateString + messageOfLog);
      }
    }
  }
}

