package club.yunzhi.log.controller;

import club.yunzhi.log.entity.User;
import club.yunzhi.log.filter.TokenFilter;
import club.yunzhi.log.service.UserService;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import net.bytebuddy.utility.RandomString;
import net.minidev.json.JSONObject;
import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.LinkedHashMap;
import java.util.Random;

import static club.yunzhi.log.filter.TokenFilter.TOKEN_KEY;
import static org.junit.Assert.*;


@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class UserControllerTest {
    private static Logger logger = LoggerFactory.getLogger(UserControllerTest.class);
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Before
    public void loginUser() throws Exception {
//        // 先设置一个用户
//        User user = new User();
//
//        String username = RandomString.make(6);
//        String password = RandomString.make(6);
//        user.setUsername(username);
//        user.setPassword(password);

        Mockito.when(this.userService.isLogin(Mockito.any(String.class))).thenReturn(true);
    }

    @Test
    public void login()throws Exception
    {
        String url = "/user/login";
        String username = RandomString.make(6);
        String password = RandomString.make(6);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("username", username);
        jsonObject.put("password", password);


        // 当以参数username, password调用userService.login方法时，返回true
        Mockito.when(this.userService.login(username, password)).thenReturn(true);


        // 触发C层并断言返回值
        this.mockMvc.perform(MockMvcRequestBuilders.post(url)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(jsonObject.toJSONString()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("true"));

        // 断言获取的参数与传入值相同
        ArgumentCaptor<String> usernameArgumentCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<String> passwordArgumentCaptor = ArgumentCaptor.forClass(String.class);
        Mockito.verify(this.userService).login(
                usernameArgumentCaptor.capture(),
                passwordArgumentCaptor.capture());
        Assert.assertEquals(username, usernameArgumentCaptor.getValue());
        Assert.assertEquals(password, passwordArgumentCaptor.getValue());
    }

    @Test
    public void findAllRequestParam() throws Exception {
        String url = "/user";
        logger.info("只传入page size，不报错");
        this.mockMvc.perform(
                MockMvcRequestBuilders.get(url)
                        .header(TokenFilter.TOKEN_KEY, "key")
                        .param("page", "1")
                        .param("size", "2"))
                .andExpect(MockMvcResultMatchers.status().isOk());

        logger.info("不传page报错");
        this.mockMvc.perform(
                MockMvcRequestBuilders.get(url)
                        .header(TokenFilter.TOKEN_KEY, "key")
                        .param("size", "2"))
                .andExpect(MockMvcResultMatchers.status().is(HttpStatus.BAD_REQUEST.value()));

        logger.info("不传size报错");
        this.mockMvc.perform(
                MockMvcRequestBuilders.get(url)
                        .header(TokenFilter.TOKEN_KEY, "key")
                        .param("page", "1"))
                .andExpect(MockMvcResultMatchers.status().is(400));
    }

    @Test
    public void save() throws Exception {
        logger.info("准备输入数据");
        String url = "/user";
        JSONObject userJsonObject = new JSONObject();
        JSONObject klassJsonObject = new JSONObject();

        userJsonObject.put("username", "用户名测试");
        userJsonObject.put("name", "姓名测试");
        userJsonObject.put("email", "邮箱测试");
        klassJsonObject.put("id", -1);


        logger.info("准备服务层被调用后的返回数据");
        User returnUser = new User();
        returnUser.setId(1L);
        returnUser.setUsername("测试返回用户名");
        returnUser.setName("测试返回姓名");
        returnUser.setEmail("测试返回邮箱");


        Mockito.when(
                userService.save(
                        Mockito.any(User.class)))
                .thenReturn(returnUser);

        logger.info("发起请求");
        MvcResult mvcResult = this.mockMvc.perform(
                MockMvcRequestBuilders.post(url)
                        .header(TokenFilter.TOKEN_KEY, "key")
                        .content(userJsonObject.toString())
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
        ).andExpect(MockMvcResultMatchers.status().is(201))
                .andDo(MockMvcResultHandlers.print())
                .andReturn();

        logger.info("新建参数捕获器");
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        Mockito.verify(userService).save(userArgumentCaptor.capture());
        User passedUser = userArgumentCaptor.getValue();

        logger.info("断言捕获的对与我们前面传入的值的相同");
        Assertions.assertThat(passedUser.getUsername()).isEqualTo("用户名测试");
        Assertions.assertThat(passedUser.getName()).isEqualTo("姓名测试");
        Assertions.assertThat(passedUser.getEmail()).isEqualTo("邮箱测试");
        Assertions.assertThat(passedUser.getId()).isNull();


        logger.info("获取返回的值并断言此值与我们模拟的返回值相同");
        String stringReturn = mvcResult.getResponse().getContentAsString();
        DocumentContext documentContext = JsonPath.parse(stringReturn);
        LinkedHashMap userHashMap = documentContext.json();
        Assertions.assertThat(userHashMap.get("id")).isEqualTo(1);
        Assertions.assertThat(userHashMap.get("username")).isEqualTo("测试返回用户名");
        Assertions.assertThat(userHashMap.get("name")).isEqualTo("测试返回姓名");
        Assertions.assertThat(userHashMap.get("email")).isEqualTo("测试返回邮箱");

    }

    @Test
    public void getById() throws Exception {
        // 准备传入的参数数据
        Long id = new Random().nextLong();

        // 准备服务层替身被调用后的返回数据
        User user = new User();
        user.setId(id);
        user.setUsername(new RandomString(6).nextString());
        user.setName(new RandomString(8).nextString());
        user.setEmail(new RandomString(8).nextString());

        Mockito.when(this.userService.findById(Mockito.anyLong())).thenReturn(user);

        // 按接口规范，向url以规定的参数发起get请求。
        // 断言请求返回了正常的状态码
        String url = "/user/" + id.toString();
        MvcResult mvcResult = this.mockMvc.perform(MockMvcRequestBuilders.get(url)
                .header(TokenFilter.TOKEN_KEY, "key"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("id").value(id))
                .andExpect(MockMvcResultMatchers.jsonPath("username").value(user.getUsername()))
                .andExpect(MockMvcResultMatchers.jsonPath("name").value(user.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("email").value(user.getEmail()))

                .andReturn();

        // 断言C层进行了数据转发（替身接收的参数值符合预期）
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.userService).findById(longArgumentCaptor.capture());
        Assertions.assertThat(longArgumentCaptor.getValue()).isEqualTo(id);
    }

    @Test
    public void update() throws Exception {
        // 准备传入参数的数据
        Long id = new Random().nextLong();

        // 准备服务层替身被调用后的返回数据
        User mockResult = new User();
        mockResult.setId(id);
        mockResult.setName(RandomString.make(6));
        mockResult.setUsername(RandomString.make(4));
        mockResult.setEmail(RandomString.make(4));
        Mockito.when(this.userService.update(Mockito.anyLong(), Mockito.any(User.class))).thenReturn(mockResult);

        JSONObject userJsonObject = new JSONObject();
        JSONObject klassJsonObject = new JSONObject();

        userJsonObject.put("username", RandomString.make(4));
        userJsonObject.put("name", RandomString.make(6));
        userJsonObject.put("email", RandomString.make(6));


        // 按接口规范发起请求，断言状态码正常，接收的数据符合预期
        String url = "/user/" + id.toString();
        this.mockMvc
                .perform(MockMvcRequestBuilders.put(url)
                        .header(TokenFilter.TOKEN_KEY, "key")
                        .content(userJsonObject.toString())
                        .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("id").value(id))
                .andExpect(MockMvcResultMatchers.jsonPath("username").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("name").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("email").exists())

        ;

        // 断言C层进行了数据转发（替身接收的参数值符合预期)
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);

        Mockito.verify(this.userService).update(longArgumentCaptor.capture(), userArgumentCaptor.capture());
        Assertions.assertThat(longArgumentCaptor.getValue()).isEqualTo(id);
        User resultUser = userArgumentCaptor.getValue();
        Assertions.assertThat(resultUser.getUsername()).isEqualTo(userJsonObject.get("username"));
        Assertions.assertThat(resultUser.getName()).isEqualTo(userJsonObject.get("name"));
        Assertions.assertThat(resultUser.getEmail()).isEqualTo(userJsonObject.get("email"));
    }

    @Test
    public void deleteById() throws Exception {
        // 准备替身、传入数据及返回数据
        Long id = new Random().nextLong();

        // deleteById方法返回类型为void，故无需对替身进行设置

        // 向指定的地址发起请求，并断言返回状态码204
        String url = "/user/" + id.toString();
        this.mockMvc.perform(MockMvcRequestBuilders.delete(url)
                .header(TokenFilter.TOKEN_KEY, "key"))
                .andExpect(MockMvcResultMatchers.status().is(204))
        ;

        // 断言调用方法符合预期
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.userService).deleteById(longArgumentCaptor.capture());
        Assert.assertEquals(longArgumentCaptor.getValue(), id);
    }

}