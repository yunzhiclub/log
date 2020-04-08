package club.yunzhi.log.repository;

import club.yunzhi.log.entity.DayLog;
import club.yunzhi.log.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author panjie
 */
public interface LogRepository extends JpaRepository<Log , Long>, JpaSpecificationExecutor {
    /**
     * 根据月份查找所有记录
     *
     * @return
     */
    @Modifying
    @Query(value = "SELECT * FROM `log` where  `timestamp` <= curdate() - interval 3 month",nativeQuery = true)
    List<Log> getLogOfThreeMonth();

    /**
     * 根据月份删除所有记录
     * @return
     */
    @Transactional(rollbackFor = Exception.class)
    @Modifying
    @Query(value = "delete from log where  `timestamp` <= curdate() - interval 3 month",nativeQuery = true)
    void deleteLogOfThreeMonth();
}
