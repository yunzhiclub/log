package com.mengyunzhi.app.log.service;

import com.mengyunzhi.app.log.entity.Log;
import com.mengyunzhi.app.log.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @Override
    public Log save(Log log) {
        return logRepository.save(log);
    }
}
