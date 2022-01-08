package club.yunzhi.log.repository;

import club.yunzhi.log.entity.Ding;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 钉钉
 */
public interface DingRepository extends JpaRepository<Ding, Long> {
}
