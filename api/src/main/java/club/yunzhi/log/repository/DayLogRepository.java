package club.yunzhi.log.repository;

import club.yunzhi.log.entity.DayLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author jincheng
 */
public interface DayLogRepository extends JpaRepository<DayLog , Long> {

}
