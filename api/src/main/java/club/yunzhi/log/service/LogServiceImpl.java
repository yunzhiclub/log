package club.yunzhi.log.service;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.Log;
import club.yunzhi.log.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author panjie
 */
@Service
public class LogServiceImpl implements LogService {
    private final
    LogRepository logRepository;

    @Autowired
    public LogServiceImpl(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    /**
     * 保存
     * @param log 日志
     * @param client 客户端
     * @return 日志
     */
    @Override
    public Log save(Log log, Client client) {
        log.setClient(client);
        return logRepository.save(log);
    }

    /**
     * 批量保存
     * @param logs 日志list
     * @param client 客户端
     */
    @Override
    public void save(List<Log> logs, Client client) {
        for (Log log : logs) {
            log.setClient(client);
        }
        logRepository.saveAll(logs);
    }
}
