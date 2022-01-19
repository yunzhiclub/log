package club.yunzhi.log.repository;

import club.yunzhi.log.entity.Ding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * 钉钉
 */
@Repository("DingRepository")
public interface DingRepository extends JpaRepository<Ding , Long>, JpaSpecificationExecutor {
}
