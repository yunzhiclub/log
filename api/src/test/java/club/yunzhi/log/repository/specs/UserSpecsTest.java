package club.yunzhi.log.repository.specs;

import club.yunzhi.log.entity.User;
import club.yunzhi.log.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@SpringBootTest
@RunWith(SpringRunner.class)
public class UserSpecsTest {

    private User user;
    @Autowired
    private UserRepository userRepository;

    @Before
    public void before() {
        this.user = new User();
        this.user.setUsername("testName");
        this.userRepository.save(this.user);
    }

    @Test
    public void containingName() {
        List users = this.userRepository.findAll(UserSpecs.containingName("testName"));
        Assertions.assertThat(users.size()).isEqualTo(1);

        users = this.userRepository.findAll(UserSpecs.containingName("testN"));
        Assertions.assertThat(users.size()).isEqualTo(1);

        users = this.userRepository.findAll(UserSpecs.containingName("stNa"));
        Assertions.assertThat(users.size()).isEqualTo(1);

        users = this.userRepository.findAll(UserSpecs.containingName("tName"));
        Assertions.assertThat(users.size()).isEqualTo(1);

        users = this.userRepository.findAll(UserSpecs.containingName("testName12"));
        Assertions.assertThat(users.size()).isEqualTo(0);

    }
}
