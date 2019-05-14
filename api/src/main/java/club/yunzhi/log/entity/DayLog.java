package club.yunzhi.log.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import java.sql.Date;
import java.util.Calendar;

/**
 * 每天的日志
 */
@Entity
public class DayLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonView(client.class)
    private Client client;

    @JsonView(base.class)
    private Date day = new Date(Calendar.getInstance().getTimeInMillis());

    @JsonView(base.class)
    private Long infoCount = 0L;

    @JsonView(base.class)
    private Long warnCount = 0L;

    @JsonView(base.class)
    private Long errorCount = 0L;

    public DayLog(Client client) {
        this.client = client;
    }

    public DayLog() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getInfoCount() {
        return infoCount;
    }

    public void setInfoCount(Long infoCount) {
        this.infoCount = infoCount;
    }

    public Long getWarnCount() {
        return warnCount;
    }

    public void setWarnCount(Long warnCount) {
        this.warnCount = warnCount;
    }

    public Long getErrorCount() {
        return errorCount;
    }

    public void setErrorCount(Long errorCount) {
        this.errorCount = errorCount;
    }

    public void addInfoCount(long count) {
        this.infoCount += count;
    }

    public void addWarnCount(long count) {
        this.warnCount += count;
    }

    public void addErrorCount(long count) {
        this.errorCount += count;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Date getDay() {
        return day;
    }

    public void setDay(Date day) {
        this.day = day;
    }

    public boolean isToday() {
        if (this.getDay() != null) {
            Calendar day = Calendar.getInstance();
            day.setTimeInMillis(this.getDay().getTime());
            Calendar today = Calendar.getInstance();
            if (day.get(Calendar.DAY_OF_YEAR) == today.get(Calendar.DAY_OF_YEAR)) {
                return true;
            }
        }

        return false;
    }

    public interface base {}
    public interface client extends Client.base {}
}
