package club.yunzhi.log.service;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.Log;

import java.util.List;

/**
 * @author panjie
 */
public interface LogService {
    Log save(Log log, Client client);
    void save(List<Log> logs, Client client);
}
