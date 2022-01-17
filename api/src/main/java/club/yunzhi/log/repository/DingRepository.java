package club.yunzhi.log.repository;

import club.yunzhi.log.entity.Ding;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

/**
 * 钉钉
 */
@Repository("DingRepository")
public interface DingRepository extends PagingAndSortingRepository<Ding, Long> {
}
