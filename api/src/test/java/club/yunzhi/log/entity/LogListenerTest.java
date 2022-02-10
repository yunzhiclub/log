package club.yunzhi.log.entity;

import club.yunzhi.log.service.ClientService;
import club.yunzhi.log.service.LogService;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

/**
 * author:LiMingAo
 * 测试客户端发生error钉钉实时提醒功能
 */
@SpringBootTest
@RunWith(SpringRunner.class)
class LogListenerTest {
    @Autowired
    ClientService clientService;
    @Autowired
    LogService logService;

    @Test
    void prePersistAndUpdate() {
        Byte errorCode = 4;
        Client client = new Client();
        Long id = new Long(1);
        client.setId(id);
        client.setToken(RandomString.make(32));
        client.setName(RandomString.make(4));
        clientService.save(client);
        Log log = new Log();
        log.setMessage(RandomString.make(6));
        log.setLevelCode(errorCode);
        log.setClient(client);
        Log newLog = new Log();
        newLog.setLevelCode(errorCode);
        newLog.setClient(client);
        List<Log> logs = new ArrayList<Log>();
        logs.add(log);
        logs.add(newLog);
        logService.save(logs);
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
