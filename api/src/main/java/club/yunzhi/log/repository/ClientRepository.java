package club.yunzhi.log.repository;

import club.yunzhi.log.entity.Client;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author panjie
 */
public interface ClientRepository extends PagingAndSortingRepository<Client, Long> {
    Client findByToken(String token);
}