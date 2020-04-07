package club.yunzhi.log.service;

import club.yunzhi.log.entity.DayLog;
import club.yunzhi.log.repository.DayLogRepository;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import javax.servlet.http.HttpServletRequest;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;

public class DayLogServiceImplTest {
    @Autowired
    DayLogService dayLogService;

    @MockBean
    DayLogRepository dayLogRepository;
    HttpServletRequest httpServletRequest;


    @Before
    public void before(){
        this.dayLogRepository = Mockito.mock(DayLogRepository.class);
        this.httpServletRequest = Mockito.mock(HttpServletRequest.class);
        DayLogServiceImpl dayLogService = new DayLogServiceImpl(this.dayLogRepository);
        this.dayLogService = Mockito.spy(dayLogService);
    }
    @Test
    public void getDayLogOfThreeMonth() {
        List<DayLog> mockDayLogs = Arrays.asList(new DayLog());
        Mockito.when(this.dayLogService.getDayLogOfThreeMonth()).thenReturn(mockDayLogs);
        List<DayLog> resultDayLogs = this.dayLogService.getDayLogOfThreeMonth();
        Assertions.assertThat(mockDayLogs).isEqualTo(resultDayLogs);

    }
}