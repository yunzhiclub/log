package club.yunzhi.log.controller;

import club.yunzhi.log.entity.User;
import club.yunzhi.log.filter.TokenFilter;
import club.yunzhi.log.service.UserService;
import club.yunzhi.log.vo.VUser;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import net.bytebuddy.utility.RandomString;
import net.minidev.json.JSONArray;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Random;

import static club.yunzhi.log.filter.TokenFilter.TOKEN_KEY;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
    public void loginUser() {
        Mockito.when(this.userService.isLogin(Mockito.any())).thenReturn(true);
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
                .andExpect(status().isOk())
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
                        .param("page", "1")
                        .param("size", "2"))
                .andExpect(status().isOk());

        logger.info("不传page报错");
        this.mockMvc.perform(
                MockMvcRequestBuilders.get(url)
                        .header(TokenFilter.TOKEN_KEY, "key")
                        .param("size", "2"))
                .andExpect(status().is(HttpStatus.BAD_REQUEST.value()));

        logger.info("不传size报错");
        this.mockMvc.perform(
                MockMvcRequestBuilders.get(url)
                        .header(TokenFilter.TOKEN_KEY, "key")
                        .param("page", "1"))
                .andExpect(status().is(400));

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
                        .content(userJsonObject.toString())
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
        ).andExpect(status().is(201))
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

        MvcResult mvcResult = this.mockMvc.perform(MockMvcRequestBuilders.get(url))
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
                        .content(userJsonObject.toString())
                        .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk())
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

        this.mockMvc.perform(MockMvcRequestBuilders.delete(url))
                .andExpect(MockMvcResultMatchers.status().is(204));

        // 断言调用方法符合预期
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.userService).deleteById(longArgumentCaptor.capture());
        Assert.assertEquals(longArgumentCaptor.getValue(), id);
    }
    /**
     * 重置密码测试
     * 1.新建一个学生
     * 2.拼接请求的json串
     * 3.模拟请求并断言返回了201
     * 断言密码重置成功
     * @throws Exception
     */
    @Test
    public void resetPassword() throws Exception {
        Long id = new Random().nextLong();
        JSONObject JsonObject = new JSONObject();
        JsonObject.put("id", id.toString());
        MockHttpServletRequestBuilder putRequest = MockMvcRequestBuilders.put("/user/resetPassword/{id}", id)
                .contentType("application/json;charset=UTF-8")
                .content(String.valueOf(JsonObject));
        this.mockMvc.perform(putRequest)
                .andExpect(status().isOk());
    }

    @Test
    public void updatePassword() throws Exception {
        VUser vUser = new VUser();
        String newPassword = RandomString.make(6);
        vUser.setNewPassword(newPassword);
        JSONObject JsonObject = new JSONObject();
        JsonObject.put("newPassword", newPassword);
        MockHttpServletRequestBuilder putRequest = MockMvcRequestBuilders.put("/user/updatePassword", vUser)
                .contentType("application/json;charset=UTF-8")
                .content(String.valueOf(JsonObject));
        this.mockMvc.perform(putRequest)
                .andExpect(status().isOk());
    }

    @Test
    public void findAll() throws Exception {
        logger.info("初始化模拟返回数据");
        List<User> users = new ArrayList<>();
        for (long i = 0; i < 2; i++) {
            User user = new User();
            user.setId(-i - 1);
            user.setUsername(RandomString.make(4));
            user.setEmail(RandomString.make(6));
            users.add(user);
        }

        logger.info("初始化分页信息及设置模拟返回数据");
        Page<User> mockOutUserPage = new PageImpl<User>(
                users,
                PageRequest.of(1, 2),
                4
        );

        Mockito.when(this.userService
                .findAll(Mockito.anyString(),
                        Mockito.anyString(),
                        Mockito.any(Pageable.class)))
                .thenReturn(mockOutUserPage);

        logger.info("以'每页2条，请求第1页'为参数发起请求，断言返回状态码为200，并接收响应数据");
        String url = "/user";
        MvcResult mvcResult = this.mockMvc.perform(
                MockMvcRequestBuilders.get(url)
                        .param("username", "testUsername")
                        .param("email", "testEmail")
                        .param("page", "1")
                        .param("size", "2"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("totalPages").value(2))  // 总页数2
                .andExpect(MockMvcResultMatchers.jsonPath("content.size()").value(2))  // 返回了两个作业
                .andReturn();

        LinkedHashMap returnJson = JsonPath.parse(mvcResult.getResponse().getContentAsString()).json();
        JSONArray content = (JSONArray) returnJson.get("content");

        logger.info("测试返回的作业");
        for (int i = 0; i < 2; i++) {
            LinkedHashMap userHashMap = (LinkedHashMap) content.get(i); // 获取第一个作业
            Assert.assertEquals(userHashMap.get("id"), -i-1);
            Assertions.assertThat(userHashMap.get("username").toString().length()).isEqualTo(4);
            Assertions.assertThat(userHashMap.get("email").toString().length()).isEqualTo(6);
        }
    }

}