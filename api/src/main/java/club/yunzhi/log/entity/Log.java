package club.yunzhi.log.entity;

import club.yunzhi.log.enums.LogLevelEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.mengyunzhi.core.entity.YunzhiEntity;
import com.mengyunzhi.core.exception.ValidationException;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashMap;

/**
 * @author panjie
 */
@Entity
@ApiModel(value = "Log", description = "日志")
public class Log implements YunzhiEntity {
    private final static Logger logger1 = LoggerFactory.getLogger(Log.class);

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ApiModelProperty("等级")
    @Transient
    private String level;

    @ApiModelProperty("等级代码:trace 0; debug 1; info 2; warn 3; error 4")
    private Byte levelCode;

    @ApiModelProperty("输出信息的类")
    private String logger;

    @ApiModelProperty("上下文")
    private String context;

    @ApiModelProperty("线程")
    private String thread;

    @ApiModelProperty("消息")
    @Column(columnDefinition = "TEXT")
    private String message;

    @ApiModelProperty("时间戳")
    private Timestamp timestamp;

    @ApiModelProperty("客户端")
    @ManyToOne
    @JoinColumn(nullable = false)
    private Client client;

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLevel() {
        if (this.level == null) {
            if (this.levelCode.equals(LogLevelEnum.DEBUG.getValue())) {
                this.levelCode = LogLevelEnum.DEBUG.getValue();
            } else if (this.levelCode.equals(LogLevelEnum.TRACE.getValue())) {
                this.levelCode = LogLevelEnum.TRACE.getValue();
            } else if (this.levelCode.equals(LogLevelEnum.INFO.getValue())) {
                this.levelCode = LogLevelEnum.INFO.getValue();
            } else if (this.levelCode.equals(LogLevelEnum.WARN.getValue())) {
                this.levelCode = LogLevelEnum.WARN.getValue();
            } else if (this.levelCode.equals(LogLevelEnum.ERROR.getValue())) {
                this.levelCode = LogLevelEnum.ERROR.getValue();
            } else {
                throw new ValidationException("非法的日志等级" + String.valueOf(this.levelCode));
            }
        }

        return this.level;
    }

    public void setLevel(String level) {
        if (level != null) {
            if (level.equals(LogLevelEnum.DEBUG.getDescription())) {
                this.levelCode = LogLevelEnum.DEBUG.getValue();
            } else if (level.equals(LogLevelEnum.TRACE.getDescription())) {
                this.levelCode = LogLevelEnum.TRACE.getValue();
            } else if (level.equals(LogLevelEnum.INFO.getDescription())) {
                this.levelCode = LogLevelEnum.INFO.getValue();
            } else if (level.equals(LogLevelEnum.WARN.getDescription())) {
                this.levelCode = LogLevelEnum.WARN.getValue();
            } else if (level.equals(LogLevelEnum.ERROR.getDescription())) {
                this.levelCode = LogLevelEnum.ERROR.getValue();
            } else {
                logger1.error("接收到了非法的日志等级" + level);
            }
        }
        this.level = level;
    }

    public String getLogger() {
        return logger;
    }

    public void setLogger(String logger) {
        this.logger = logger;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public String getThread() {
        return thread;
    }

    public void setThread(String thread) {
        this.thread = thread;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public Byte getLevelCode() {
        return levelCode;
    }

    public void setLevelCode(Byte levelCode) {
        this.levelCode = levelCode;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
