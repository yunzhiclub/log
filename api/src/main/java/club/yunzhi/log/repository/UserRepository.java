package club.yunzhi.log.repository;

import club.yunzhi.log.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository  extends CrudRepository<User,Long> {
    /**
     * 查找用户
     * @param username 用户名
     * @return
     */
User findByUsername(String username);
}
