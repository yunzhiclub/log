package club.yunzhi.log.entity;

import club.yunzhi.log.service.DingService;
import club.yunzhi.log.service.DingServiceImpl;
import org.slf4j.LoggerFactory;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LogListener {
    @Autowired
    DingService dingService;
    private final Logger logger = (Logger) LoggerFactory.getLogger(LogListener.class);
    Date currentTime = new Date();
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
    Byte error = 4;
    Client client;
    String message;
    String dateString = formatter.format(currentTime);
    @PrePersist
    @PreUpdate
    public void prePersistAndUpdate(Log log) {
        if (log.getLevelCode().equals(error)) {
            client = log.getClient();
            logger.debug("首先获取所有的钉钉");
            List<Ding> dings = dingService.getAllStartDing();
            for (Ding ding : dings) {
                if(ding.getClient().getId().equals(log.getClient().getId())) {
                    this.message = "客户端: " + this.client.getName() + "  出现了ERROR";
                    StringBuffer resultBuffer = new StringBuffer();
                    String result = message;
                    resultBuffer.append(result);
                    String messageOfLog = resultBuffer.toString();
                    dingService.dingRequest(ding, "执行推送任务" + "\n" + dateString + "\n" + messageOfLog);
                }
            }
        }
    }
}
