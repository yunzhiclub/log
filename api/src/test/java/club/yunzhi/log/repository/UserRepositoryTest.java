package club.yunzhi.log.repository;

import club.yunzhi.log.entity.User;
import net.bytebuddy.utility.RandomString;
import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;


    @Test
    public void findByUsername() {
        // 准备测试数据并持久化
       User user = new  User();
        user.setUsername(RandomString.make(6));
        this.userRepository.save(user);


        // 调用测试方法并断言
       User user1 = this.userRepository.findByUsername(user.getUsername());
        Assert.assertEquals(user.getId(), user1.getId());
    }

    @Test
    public void findAll() {

        User user = new User();
        user.setUsername("testUserName");
        user.setEmail("testEmail");
        this.userRepository.save(user);

        /* 初始化2个不同班级的学生并持久化 */
        User user1 = new User();
        user1.setUsername("testUserName1");
        user1.setEmail("testEmail1");
        this.userRepository.save(user1);

        Page userPage = this.userRepository.findAll("testUserName", "testEmail", PageRequest.of(0, 2));
        Assertions.assertThat(userPage.getTotalElements()).isEqualTo(2);

        userPage = this.userRepository.findAll("testUserName12", "testEmail", PageRequest.of(0, 2));
        Assertions.assertThat(userPage.getTotalElements()).isEqualTo(0);

        userPage = this.userRepository.findAll("testUserName", "testEmail12", PageRequest.of(0, 2));
        Assertions.assertThat(userPage.getTotalElements()).isEqualTo(0);

        userPage = this.userRepository.findAll(null, "testEmail", PageRequest.of(0, 2));
        Assertions.assertThat(userPage.getTotalElements()).isEqualTo(2);

        userPage = this.userRepository.findAll(null, null, PageRequest.of(0, 2));
        Assertions.assertThat(userPage.getTotalElements()).isEqualTo(2);

    }

    @Test(expected = InvalidDataAccessApiUsageException.class)
    public void findAllWithPageableIsNull() {
        this.userRepository.findAll("name", "sno", null);
    }
}