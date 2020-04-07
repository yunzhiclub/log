package club.yunzhi.log.service;

import club.yunzhi.log.entity.DayLog;
import club.yunzhi.log.repository.DayLogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DayLogServiceImpl implements DayLogService{
    private final static Logger logger = LoggerFactory.getLogger(DayLogServiceImpl.class);
    private final DayLogRepository dayLogRepository;

    public DayLogServiceImpl(DayLogRepository dayLogRepository) {
        this.dayLogRepository = dayLogRepository;
    }


    @Override
    public List<DayLog> getDayLogOfThreeMonth(){
       return dayLogRepository.getDayLogOfThreeMonth();
    }

    @Override
    public void deleteDayLogOfThreeMonth() {
     dayLogRepository.deleteDayLogOfThreeMonth();
    }
}

