package club.yunzhi.log.repository;

import club.yunzhi.log.entity.DayLog;
import club.yunzhi.log.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * @author jincheng
 */
public interface DayLogRepository extends JpaRepository<DayLog, Long> {
    /**
     * 查找昨天的日志记录
     *
     * @return
     */
    default List<DayLog> getLogOfYesterday() throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Calendar calendar = Calendar.getInstance();
        Calendar calendar1 = Calendar.getInstance();
        calendar1.add(Calendar.HOUR, -8);
        long endTimeStamp = calendar1.getTimeInMillis();
        String endTime = formatter.format(endTimeStamp);
        Date endDate = formatter.parse(endTime);
        calendar.add(Calendar.DATE, -1);
        long startTimeStamp = calendar.getTimeInMillis();
        String startTime = formatter.format(startTimeStamp);
        Date startDate = formatter.parse(startTime);
        return this.findAllByDayBetween(startDate,endDate);
    };

    List<DayLog> findAllByDayBetween(Date startTime ,Date endTime);

}
