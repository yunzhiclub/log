package club.yunzhi.log.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.mengyunzhi.core.entity.YunzhiEntity;
import com.mengyunzhi.core.service.CommonService;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;

/**
 * @author panjie
 * 项目
 */
@Entity
@ApiModel(value = "Client", description = "项目")
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"token", "deleteAt"}))
@SQLDelete(sql = "update `client` set deleted = 1, delete_at = UNIX_TIMESTAMP() where id = ?")
@Where(clause = "deleted = false")
public class Client implements YunzhiEntity<Long>, Serializable {
    private static final long serialVersionUID = 8945942012064094435L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(base.class)
    private Long id;

    @Column(nullable = false, length = 32)
    @JsonView(base.class)
    private String token = CommonService.getRandomStringByLength(32);

    @JsonView(base.class)
    private String name;

    @JsonView(base.class)
    private String description;

    @JsonView(base.class)
    private String url;

    @JsonView(base.class)
    private Timestamp lastSendTime;

    @JsonView(base.class)
    private Timestamp lastStartTime;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @JsonView(todayLog.class)
    private DayLog todayLog = new DayLog(this);

    @CreationTimestamp
    @JsonView(base.class)
    private Date deployDate;

    @JsonView(DeleteAtJsonView.class)
    @Column(nullable = false)
    protected Long deleteAt = 0L;

    @JsonView(DeletedJsonView.class)
    private Boolean deleted = false;

    @JsonView(base.class)
    private Boolean state = false;

    public Client() {
    }

    public Client(Long id) {
        this.id = id;
    }

    @Override
    public Long getId() {
        return this.id;
    }

    @Override
    public Boolean getDeleted() {
        return false;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(final String token) {
        this.token = token;
    }

    public String getName() {
        return this.name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public String getUrl() {
        return this.url;
    }

    public void setUrl(final String url) {
        this.url = url;
    }

    public Timestamp getLastSendTime() {
        return this.lastSendTime;
    }

    public void setLastSendTime(final Timestamp lastSendTime) {
        this.lastSendTime = lastSendTime;
    }

    public Timestamp getLastStartTime() {
        return this.lastStartTime;
    }

    public void setLastStartTime(final Timestamp lastStartTime) {
        this.lastStartTime = lastStartTime;
    }

    public Date getDeployDate() {
        return this.deployDate;
    }

    public void setDeployDate(final Date deployDate) {
        this.deployDate = deployDate;
    }

    public DayLog getTodayLog() {
        return todayLog;
    }

    public void setTodayLog(DayLog todayLog) {
        this.todayLog = todayLog;
    }

    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public interface base {
    }

    public interface todayLog extends DayLog.base{}

    public interface DeleteAtJsonView {
    }

    public interface DeletedJsonView {
    }
}
