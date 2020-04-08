package club.yunzhi.log.repository;

import club.yunzhi.log.entity.DayLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

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
    @Modifying
    @Query(value = "SELECT * FROM  day_log where  `day` <= curdate() - interval 1 day", nativeQuery = true)
    List<DayLog> getLogOfYesterday();

}
