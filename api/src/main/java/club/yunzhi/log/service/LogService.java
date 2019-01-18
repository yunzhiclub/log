package club.yunzhi.log.service;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.Log;

/**
 * @author panjie
 */
public interface LogService {
    Log save(Log log, Client client);
}
