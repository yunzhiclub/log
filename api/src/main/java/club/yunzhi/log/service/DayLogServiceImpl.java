package club.yunzhi.log.service;


import club.yunzhi.log.repository.LogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DayLogServiceImpl implements DayLogService{

    public DayLogServiceImpl(LogRepository logRepository) {
    }
}

