package club.yunzhi.log.service;

import club.yunzhi.log.entity.DayLog;
import club.yunzhi.log.entity.Log;
import club.yunzhi.log.repository.DayLogRepository;
import club.yunzhi.log.repository.LogRepository;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.Arrays;
import java.util.List;

public class LogServiceImplTest {
    @Autowired
    LogService logService;

    @MockBean
    LogRepository logRepository;
    HttpServletRequest httpServletRequest;


    @Before
    public void before(){
        this.logRepository = Mockito.mock(LogRepository.class);
        this.httpServletRequest = Mockito.mock(HttpServletRequest.class);
        LogServiceImpl logService = new LogServiceImpl(this.logRepository);
        this.logService = Mockito.spy(logService);
    }
    @Test
    public void getDayLogOfThreeMonth() throws ParseException {

        List<Log> mockLogs = Arrays.asList(new Log());
        Mockito.when(this.logService.getLogOfThreeMonth()).thenReturn(mockLogs);
        List<Log> resultDayLogs = this.logService.getLogOfThreeMonth();
        Assertions.assertThat(mockLogs).isEqualTo(resultDayLogs);

    }
}