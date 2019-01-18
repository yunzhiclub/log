package club.yunzhi.log.service;

import club.yunzhi.log.entity.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author panjie
 * 客户端
 */
public interface ClientService {
    Client getOneSavedClient();
    Client getOneUnsavedClient();
    Page<Client> page(Pageable pageable);
    Client save(Client client);
}
