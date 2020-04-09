package club.yunzhi.log.service;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.repository.ClientRepository;
import net.bytebuddy.utility.RandomString;

import org.assertj.core.api.Assertions;
import org.junit.Assert;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.context.ApplicationContext;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.slf4j.Logger;

import java.util.Optional;
import java.util.Random;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ClientServiceImplTest {
    Random random = new Random();
    private static Logger logger = LoggerFactory.getLogger(ClientServiceImplTest.class);

    @MockBean
    ClientRepository clientRepository;

    @Autowired
    ClientService clientService;

    @Autowired
    ApplicationContext applicationContext;

    /**
     * 保存
     * 1. 模拟输入、输出
     * 2. 调用测试方法
     * 3. 断言数据转发与输出
     */
    @Test
    public void save() {
        Client passClient = new Client();
        Client mockReturnClient = new Client();
        Mockito.when(clientRepository.save(Mockito.any(Client.class)))
                .thenReturn(mockReturnClient);

        Client returnClient = this.clientService.save(passClient);
        ArgumentCaptor<Client> clientArgumentCaptor = ArgumentCaptor.forClass(Client.class);
        Mockito.verify(clientRepository).save(clientArgumentCaptor.capture());

        Assertions.assertThat(clientArgumentCaptor.getValue()).isEqualTo(passClient);
        Assertions.assertThat(returnClient).isEqualTo(mockReturnClient);
    }

    /**
     * 调用测试
     */
    @Test
    public void findById() {
        // 准备调用时的参数及返回值
        Long id = new Random().nextLong();
        Client mockReturnClient = new Client();
        Mockito.doReturn(Optional.of(mockReturnClient)).when(this.clientRepository).findById(id);
        // 发起调用
        Client client = this.clientService.findById(id);

        // 断言返回值与预期相同
        Assertions.assertThat(client).isEqualTo(mockReturnClient);

        // 断言接收到的参数与预期相同
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.clientRepository).findById(longArgumentCaptor.capture());
        Assertions.assertThat(longArgumentCaptor.getValue()).isEqualTo(id);
    }

    @Test
    public void update() {
        Long id = this.random.nextLong();

        Client oldClient = new Client();

        Mockito.doReturn(Optional.of(oldClient))
                .when(this.clientRepository)
                .findById(Mockito.eq(id));

        Client client = new Client();
        client.setName(RandomString.make(10));

        Client resultClient = new Client();
        Mockito.when(this.clientRepository
                .save(Mockito.eq(oldClient)))
                .thenReturn(resultClient);

        Assert.assertEquals(resultClient, this.clientService.update(id, client));
        Assert.assertEquals(oldClient.getName(),client.getName());
    }
    
    @Test
    public void deleteById() {
        // 替身及模拟返回值准备
        Long id = new Random().nextLong();

        // clientRepository.deleteById方法的返回值类型为void。
        // Mockito已默认为返回值为void默认生了返回值，无需对此替身单元做设置

        // 调用方法
        this.clientService.deleteById(id);

        // 预测以期望的参数值调用了期望的方法
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.clientRepository).deleteById(longArgumentCaptor.capture());
        Assert.assertEquals(longArgumentCaptor.getValue(), id);
    }
}
