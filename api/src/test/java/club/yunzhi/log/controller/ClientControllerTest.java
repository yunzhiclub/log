package club.yunzhi.log.controller;

import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.Client;
import club.yunzhi.log.entity.User;
import club.yunzhi.log.filter.TokenFilter;
import club.yunzhi.log.service.ClientService;
import club.yunzhi.log.service.UserService;
import net.bytebuddy.utility.RandomString;
import net.minidev.json.JSONObject;
import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Random;

@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
public class ClientControllerTest {
    @MockBean
    protected ClientService clientService;

    @Autowired
    protected MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Before
    public void loginUser() throws Exception {
        Mockito.when(this.userService.isLogin(Mockito.any(String.class))).thenReturn(true);
    }
    @Test
    public void getById() throws Exception {
        // 准备传入的参数数据
        Long id = new Random().nextLong();

        // 准备服务层替身被调用后的返回数据
        Client client = new Client();
        client.setId(id);
        client.setName(new RandomString(8).nextString());

        Mockito.when(this.clientService.findById(Mockito.anyLong())).thenReturn(client);

        // 按接口规范，向url以规定的参数发起get请求。
        // 断言请求返回了正常的状态码
        String url = "/client/" + id.toString();
        this.mockMvc
                .perform(MockMvcRequestBuilders.get(url)
                .header(TokenFilter.TOKEN_KEY, "key"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("id").value(id))
                .andExpect(MockMvcResultMatchers.jsonPath("name").value(client.getName()))
                .andReturn();

        // 断言C层进行了数据转发（替身接收的参数值符合预期）
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.clientService).findById(longArgumentCaptor.capture());
        Assertions.assertThat(longArgumentCaptor.getValue()).isEqualTo(id);
    }

    @Test
    public void update() throws Exception {
        // 准备传入参数的数据
        Long id = new Random().nextLong();

        // 准备服务层替身被调用后的返回数据
        Client mockResult = new Client();
        mockResult.setId(id);
        mockResult.setName(RandomString.make(6));
        Mockito.when(this.clientService.update(Mockito.anyLong(), Mockito.any(Client.class))).thenReturn(mockResult);

        JSONObject clientJsonObject = new JSONObject();
        JSONObject klassJsonObject = new JSONObject();

        clientJsonObject.put("clientname", RandomString.make(4));

        // 按接口规范发起请求，断言状态码正常，接收的数据符合预期
        String url = "/client/" + id.toString();
        this.mockMvc
                .perform(MockMvcRequestBuilders.put(url)
                        .header(TokenFilter.TOKEN_KEY, "key")
                        .content(clientJsonObject.toString())
                        .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("id").value(id))
        ;

        // 断言C层进行了数据转发（替身接收的参数值符合预期)
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        ArgumentCaptor<Client> clientArgumentCaptor = ArgumentCaptor.forClass(Client.class);

        Mockito.verify(this.clientService).update(longArgumentCaptor.capture(), clientArgumentCaptor.capture());
        Assertions.assertThat(longArgumentCaptor.getValue()).isEqualTo(id);
        Client resultClient = clientArgumentCaptor.getValue();
        Assertions.assertThat(resultClient.getName()).isEqualTo(clientJsonObject.get("name"));
    }

    @Test
    public void deleteById() throws Exception {
        // 准备替身、传入数据及返回数据
        Long id = new Random().nextLong();

        // deleteById方法返回类型为void，故无需对替身进行设置

        // 向指定的地址发起请求，并断言返回状态码204
        String url = "/client/" + id.toString();
        this.mockMvc.perform(MockMvcRequestBuilders.delete(url)
                .header(TokenFilter.TOKEN_KEY, "key"))
                .andExpect(MockMvcResultMatchers.status().is(200))
        ;

        // 断言调用方法符合预期
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.clientService).deleteById(longArgumentCaptor.capture());
        Assert.assertEquals(longArgumentCaptor.getValue(), id);
    }
}
