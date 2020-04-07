package club.yunzhi.log.service;

import club.yunzhi.log.entity.DayLog;

import java.util.List;

public interface DayLogService {
    List<DayLog> getDayLogOfThreeMonth();

    void deleteDayLogOfThreeMonth();
}
