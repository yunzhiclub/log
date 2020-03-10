package club.yunzhi.log.service;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.Log;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * @author panjie
 */
public interface LogService<T> extends YunzhiService<T>{
    Log save(Log log, Client client);
    void save(List<Log> logs);

    /**
     * 分页数据
     */
    Page<Log> page(Long clientId, Pageable pageable);
}
