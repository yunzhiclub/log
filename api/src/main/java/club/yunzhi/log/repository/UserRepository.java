package club.yunzhi.log.repository;

import club.yunzhi.log.entity.User;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserRepository  extends PagingAndSortingRepository<User,Long>, JpaSpecificationExecutor {
    /**
     * 查找用户
     * @param username 用户名
     * @return
     */
User findByUsername(String username);
}
