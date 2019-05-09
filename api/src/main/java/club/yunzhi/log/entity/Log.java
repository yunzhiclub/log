package club.yunzhi.log.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashMap;

/**
 * @author panjie
 */
@Entity
@ApiModel(value = "Log", description = "日志")
public class Log {
    private final static HashMap<String, Byte> levelCodeHashMap = new HashMap<String, Byte>() {{
        put("TRACE", (byte) 0);
        put("DEBUG", (byte) 1);
        put("INFO", (byte) 2);
        put("WARN", (byte) 3);
        put("ERROR", (byte) 4);
    }};

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLevel() {
        if (this.level == null) {
            Log.levelCodeHashMap.forEach((key, value) -> {
                if (value.equals(this.levelCode)) {
                    this.level = key;
                }
            });
        }

        return this.level;
    }

    public void setLevel(String level) {
        Log.levelCodeHashMap.forEach((key, value) -> {
            if (key.equals(level)) {
                this.setLevelCode(value);
            }
        });
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
