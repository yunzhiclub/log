package club.yunzhi.log.entity;

import club.yunzhi.log.enums.LogLevelEnum;
import club.yunzhi.log.exception.ValidationException;
import com.fasterxml.jackson.annotation.JsonView;
import com.mengyunzhi.core.entity.YunzhiEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
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
@EntityListeners(LogListener.class)
@SQLDelete(sql = "update `log` set deleted = 1 where id = ?")
@Where(clause = "deleted = false")
@ApiModel(value = "Log", description = "日志")
public class Log implements YunzhiEntity<Long> {
    private final static Logger logger1 = LoggerFactory.getLogger(Log.class);

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(base.class)
    private Long id;

    @ApiModelProperty("等级")
    @Transient
    @JsonView(base.class)
    private String level;

    @ApiModelProperty("等级代码:trace 0; debug 1; info 2; warn 3; error 4")
    @JsonView(base.class)
    private Byte levelCode;

    @ApiModelProperty("输出信息的类")
    @JsonView(base.class)
    private String logger;

    @ApiModelProperty("上下文")
    @JsonView(base.class)
    private String context;

    @ApiModelProperty("线程")
    @JsonView(base.class)
    private String thread;

    @ApiModelProperty("消息")
    @JsonView(base.class)
    @Column(columnDefinition = "TEXT")
    private String message;

    @ApiModelProperty("时间戳")
    @JsonView(base.class)
    private Timestamp timestamp;

    @JsonView(DayLog.DeletedJsonView.class)
    protected Boolean deleted = false;

    @ApiModelProperty("客户端")
    @ManyToOne
    @JoinColumn(nullable = false)
    @JsonView(client.class)
    private Client client;


    @Override
    public Long getId() {
        return id;
    }

    @Override
    public Boolean getDeleted() {
        return false;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLevel() {
        if (this.level == null || this.level.isEmpty()) {
            if (this.levelCode != null) {
                if (this.levelCode.equals(LogLevelEnum.DEBUG.getValue())) {
                    this.level = LogLevelEnum.DEBUG.getDescription();
                } else if (this.levelCode.equals(LogLevelEnum.TRACE.getValue())) {
                    this.level = LogLevelEnum.TRACE.getDescription();
                } else if (this.levelCode.equals(LogLevelEnum.INFO.getValue())) {
                    this.level = LogLevelEnum.INFO.getDescription();
                } else if (this.levelCode.equals(LogLevelEnum.WARN.getValue())) {
                    this.level = LogLevelEnum.WARN.getDescription();
                } else if (this.levelCode.equals(LogLevelEnum.ERROR.getValue())) {
                    this.level = LogLevelEnum.ERROR.getDescription();
                } else {
                    throw new ValidationException("非法的日志等级" + String.valueOf(this.levelCode));
                }
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

    public interface base {}
    public interface client extends Client.base {}
    public interface DeleteAtJsonView {}
    public interface DeletedJsonView {}
}
