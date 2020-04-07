package club.yunzhi.log.repository;

import club.yunzhi.log.entity.DayLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author jincheng
 */
public interface DayLogRepository extends JpaRepository<DayLog , Long> {
    /**
     * 根据月份查找所有记录
     *
     * @return
     */
    @Modifying
    @Query(value = "select * from day_log where  `day` <= curdate() - interval 3 month",nativeQuery = true)
    List<DayLog>  getDayLogOfThreeMonth();

    /**
     * 根据月份删除所有记录
     * @return
     */
    @Transactional(rollbackFor = Exception.class)
    @Modifying
    @Query(value = "delete from day_log where  `day` <= curdate() - interval 3 month",nativeQuery = true)
    void deleteDayLogOfThreeMonth();
}
