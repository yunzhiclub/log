package club.yunzhi.log.entity;

import club.yunzhi.log.service.ClientService;
import club.yunzhi.log.service.LogService;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.lang.reflect.Array;

import static org.junit.jupiter.api.Assertions.*;

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
        client.setToken(RandomString.make(32));
        client.setName(RandomString.make(4));
        clientService.save(client);
        Log log = new Log();
        log.setLevelCode(errorCode);
        log.setClient(client);
        log.setClient(client);
        logService.save(log, client);
    }
}