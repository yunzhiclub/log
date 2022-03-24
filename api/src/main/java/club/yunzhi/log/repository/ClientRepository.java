package club.yunzhi.log.repository;

import club.yunzhi.log.entity.Client;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import javax.persistence.LockModeType;
import javax.transaction.Transactional;
import java.util.Optional;

/**
 * @author panjie
 */
public interface ClientRepository extends PagingAndSortingRepository<Client, Long>, JpaSpecificationExecutor {
    Client findByToken(String token);

    /**
     * 查询时加上悲观锁
     * 在我们没有将其提交事务之前，其他线程是不能获取修改的，需要等待
     * @param id clientId
     * @return
     */
    @Lock(value = LockModeType.PESSIMISTIC_WRITE)
    @Query("select a from Client a where a.id = :id")
    Optional<Client> findClientByIdWithPessimisticLock(Long id);
}
