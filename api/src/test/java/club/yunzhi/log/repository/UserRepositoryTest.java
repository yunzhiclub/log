package club.yunzhi.log.repository;

import club.yunzhi.log.entity.User;
import net.bytebuddy.utility.RandomString;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

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
}