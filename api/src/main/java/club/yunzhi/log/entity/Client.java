package club.yunzhi.log.entity;

import com.mengyunzhi.core.entity.YunzhiEntity;
import com.mengyunzhi.core.service.CommonService;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Time;

/**
 * @author panjie
 * 项目
 */
@Entity
@ApiModel(value = "Client", description = "项目")
public class Client implements YunzhiEntity, Serializable {
    private static final long serialVersionUID = 8945942012064094435L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 40)
    private String token = CommonService.getRandomStringByLength(40);

    private String name;

    private String description;

    private String address;

    private Time lastSendTime;

    private Time lastStartTime;

    @CreationTimestamp
    private Date deployDate;

    private Long infoCount = 0L;

    private Long warnCount = 0L;

    private Long errorCount = 0L;

    public Client() {
    }

    public Client(Long id) {
        this.id = id;
    }

    @Override
    public Long getId() {
        return this.id;
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

    public String getAddress() {
        return this.address;
    }

    public void setAddress(final String address) {
        this.address = address;
    }

    public Time getLastSendTime() {
        return this.lastSendTime;
    }

    public void setLastSendTime(final Time lastSendTime) {
        this.lastSendTime = lastSendTime;
    }

    public Time getLastStartTime() {
        return this.lastStartTime;
    }

    public void setLastStartTime(final Time lastStartTime) {
        this.lastStartTime = lastStartTime;
    }

    public Date getDeployDate() {
        return this.deployDate;
    }

    public void setDeployDate(final Date deployDate) {
        this.deployDate = deployDate;
    }

    public Long getInfoCount() {
        return this.infoCount;
    }

    public void setInfoCount(final Long infoCount) {
        this.infoCount = infoCount;
    }

    public Long getWarnCount() {
        return this.warnCount;
    }

    public void setWarnCount(final Long warnCount) {
        this.warnCount = warnCount;
    }

    public Long getErrorCount() {
        return this.errorCount;
    }

    public void setErrorCount(final Long errorCount) {
        this.errorCount = errorCount;
    }
}
