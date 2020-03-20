package club.yunzhi.log.service;

import club.yunzhi.log.entity.User;
import club.yunzhi.log.repository.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Random;

public class UserServiceImplTest {

    @Autowired
    UserService userService;

    @MockBean
    UserRepository userRepository;

    HttpServletRequest httpServletRequest;

    @Autowired
    ApplicationContext applicationContext;

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

    /**
     * 保存
     * 1. 模拟输入、输出
     * 2. 调用测试方法
     * 3. 断言数据转发与输出
     */
    @Test
    public void save() {
//        UserRepository userRepository = Mockito.mock(UserRepository.class);
//        ConfigurableApplicationContext configurableApplicationContext = (ConfigurableApplicationContext) applicationContext;
//        configurableApplicationContext.getBeanFactory().registerSingleton("UserRepository", userRepository);

        User passUser = new User();
        User mockReturnUser = new User();
        Mockito.when(userRepository.save(Mockito.any(User.class)))
                .thenReturn(mockReturnUser);

        User returnUser = this.userService.save(passUser);
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        Mockito.verify(userRepository).save(userArgumentCaptor.capture());

        Assertions.assertThat(userArgumentCaptor.getValue()).isEqualTo(passUser);
        Assertions.assertThat(returnUser).isEqualTo(mockReturnUser);
    }

    /**
     * 分页查询
     * 1. 模拟输入、输出、调用userRepository
     * 2. 调用测试方法
     * 3. 断言输入与输出与模拟值相符
     */
    @Test
    public void findAll() {
        Pageable mockInPageable = PageRequest.of(1, 20);
        List<User> mockUsers = Arrays.asList(new User());
        Page<User> mockOutUserPage = new PageImpl<User>(
                mockUsers,
                PageRequest.of(1, 20),
                21);
        Mockito.when(this.userRepository.findAll(Mockito.any(Pageable.class)))
                .thenReturn(mockOutUserPage);

        Page<User> userPage = this.userService.findAll(mockInPageable);

        Assertions.assertThat(userPage).isEqualTo(mockOutUserPage);
        ArgumentCaptor<Pageable> pageableArgumentCaptor = ArgumentCaptor.forClass(Pageable.class);
        Mockito.verify(this.userRepository).findAll(pageableArgumentCaptor.capture());
        Assertions.assertThat(pageableArgumentCaptor.getValue()).isEqualTo(mockInPageable);
    }

    /**
     * 参数为null测试
     */
    @Test(expected = IllegalArgumentException.class)
    public void findByIdNullArgument() {
        this.userService.findById(null);
    }

    /**
     * 调用测试
     */
    @Test
    public void findById() {
        // 准备调用时的参数及返回值
        Long id = new Random().nextLong();
        User mockReturnUser = new User();
        Mockito.when(this.userRepository.findById(id)).thenReturn(Optional.of(mockReturnUser));

        // 发起调用
        User user = this.userService.findById(id);

        // 断言返回值与预期相同
        Assertions.assertThat(user).isEqualTo(mockReturnUser);

        // 断言接收到的参数与预期相同
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.userRepository).findById(longArgumentCaptor.capture());
        Assertions.assertThat(longArgumentCaptor.getValue()).isEqualTo(id);
    }

    @Test
    public void update() {
        // 准备替身及调用替身后的模拟返回值
        // 第一个替身（间谍）
        Long id = new Random().nextLong();
        User mockResultUser = new User();
        Mockito.when(this.userRepository.findById(id)).thenReturn(Optional.of(mockResultUser));

        // 第二个替身. 1. 由this.userService clone出一个替身，该替身具有原userService中的所有功能及属性
        UserService userServiceSpy = Mockito.spy(this.userService);

        // 由于updateFields方法并不存在于UserService接口上，所以预对updateFields设置替身
        // 则需要对类型进行转制转换
        // （虽然注入时声明的为UserService，但实际注入的为UserServiceImpl，这是强制转换的基础）
        UserServiceImpl userServiceImplSpy = (UserServiceImpl) userServiceSpy;
        User mockResultUser1 = new User();
        Mockito.doReturn(mockResultUser1).when(userServiceImplSpy).updateFields(Mockito.any(User.class), Mockito.any(User.class));

        // 调用update方法测试
        User user = new User();
        User resultUser = userServiceImplSpy.update(id, user);

        // 断言传入第一个替身参数符合预期
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.userRepository).findById(longArgumentCaptor.capture());
        Assertions.assertThat(longArgumentCaptor.getValue()).isEqualTo(id);

        // 断言第二个替身参数符合预期：参数1为传入update方法的用户，参数2为替身1的返回值
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        ArgumentCaptor<User> userArgumentCaptor1 = ArgumentCaptor.forClass(User.class);
        Mockito.verify(userServiceImplSpy).updateFields(userArgumentCaptor.capture(), userArgumentCaptor1.capture());
        Assertions.assertThat(userArgumentCaptor.getValue()).isEqualTo(user);
        Assertions.assertThat(userArgumentCaptor1.getValue()).isEqualTo(mockResultUser);

        // 断言返回值就是第二个替身的返回值
        Assertions.assertThat(resultUser).isEqualTo(mockResultUser1);
    }

    @Test
    public void updateFields() {
        // 准备替身
        User mockResultUser = new User();
        Mockito.when(this.userRepository.save(Mockito.any(User.class))).thenReturn(mockResultUser);

        // 调用updateFields方法
        UserServiceImpl userServiceImpl = (UserServiceImpl) this.userService;
        User newUser = new User();
        newUser.setName(RandomString.make(8));
        newUser.setUsername(RandomString.make(4));
        newUser.setEmail(RandomString.make(4));
        User oldUser = new User();
        oldUser.setId(new Random().nextLong());

        User resultUser = userServiceImpl.updateFields(newUser, oldUser);

        // 断言传入替身的参数符合预期（更新了用户信息）
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        Mockito.verify(this.userRepository).save(userArgumentCaptor.capture());
        User editedUser = userArgumentCaptor.getValue();
        Assertions.assertThat(editedUser.getId()).isEqualTo(oldUser.getId());
        Assertions.assertThat(editedUser.getName()).isEqualTo(newUser.getName());
        Assertions.assertThat(editedUser.getUsername()).isEqualTo(newUser.getUsername());
        Assertions.assertThat(editedUser.getEmail()).isEqualTo(newUser.getEmail());

        // 断言返回值符合预期
        Assertions.assertThat(resultUser).isEqualTo(mockResultUser);
    }

    /**
     * 参数验证
     */
    @Test(expected = IllegalArgumentException.class)
    public void deleteByIdValidate() {
        this.userService.deleteById(null);
    }

    /**
     * 功能测试
     */
    @Test
    public void deleteById() {
        // 替身及模拟返回值准备
        Long id = new Random().nextLong();

        // userRepository.deleteById方法的返回值类型为void。
        // Mockito已默认为返回值为void默认生了返回值，无需对此替身单元做设置

        // 调用方法
        this.userService.deleteById(id);

        // 预测以期望的参数值调用了期望的方法
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.userRepository).deleteById(longArgumentCaptor.capture());
        Assert.assertEquals(longArgumentCaptor.getValue(), id);
    }





}