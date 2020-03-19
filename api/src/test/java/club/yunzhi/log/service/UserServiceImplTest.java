package club.yunzhi.log.service;

import club.yunzhi.log.entity.User;
import club.yunzhi.log.repository.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;

import javax.servlet.http.HttpServletRequest;

public class UserServiceImplTest {

    private UserServiceImpl userService;
    private UserRepository userRepository;
    private HttpServletRequest httpServletRequest;

    @Before
    public void before(){
        this.userRepository = Mockito.mock(UserRepository.class);
        this.httpServletRequest = Mockito.mock(HttpServletRequest.class);
        UserServiceImpl userService = new UserServiceImpl(this.userRepository,this.httpServletRequest);
        this.userService = Mockito.spy(userService);
    }
    @Test
    public void login() {
        String username = RandomString.make(6);
        String password = RandomString.make(6);
        User user  =  new User();
        Mockito.when(this.userRepository.findByUsername(username)).thenReturn(user);
        Mockito.doReturn(true).when(this.userService).validatePassword(user, password);

        // 调用
        boolean result = this.userService.login(username, password);

        // 断言
        Assert.assertTrue(result);
        ArgumentCaptor<String> stringArgumentCaptor =  ArgumentCaptor.forClass(String.class);
        Mockito.verify(this.userRepository).findByUsername(stringArgumentCaptor.capture());
        Assert.assertEquals(stringArgumentCaptor.getValue(), username);
    }

    @Test
    public void validatePassword() {
        // 用户中有密码，且密码与传入的密码相同，返回true
        User user = new User();
        String password = RandomString.make(6);
        user.setPassword(password);
        Assert.assertTrue(this.userService.validatePassword(user, password));
        // 用户为null返回false
        Assert.assertFalse(
                this.userService.validatePassword(
                        null,
                        password));

        // 传入的密码为null返回false
        Assert.assertFalse(
                this.userService.validatePassword(
                        user, null));

        // 未设置 用户的密码，返回false
        user.setPassword(null);
        Assert.assertFalse(
                this.userService.validatePassword(
                        user, password));

        //  用户中的密码与传入的密码不相同返回false
        user.setPassword(RandomString.make(6));
        Assert.assertFalse(
                this.userService.validatePassword(
                        user, password));
    }

}