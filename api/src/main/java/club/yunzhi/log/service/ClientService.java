package club.yunzhi.log.service;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.Log;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * @author panjie
 * 客户端
 */
public interface ClientService<T> extends YunzhiService<T>{
    Client getOneSavedClient();
    Client getOneUnsavedClient();
    Page<Client> page(Pageable pageable);
    Client save(Client client);

    void update(List<Log> logs);
}
