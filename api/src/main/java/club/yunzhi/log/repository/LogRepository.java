package club.yunzhi.log.repository;

import club.yunzhi.log.entity.Log;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

/**
 * @author panjie
 */
public interface LogRepository extends CrudRepository<Log, Long>, JpaSpecificationExecutor {
}
