package club.yunzhi.log.repository;

import club.yunzhi.log.entity.User;
import club.yunzhi.log.repository.specs.UserSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import javax.validation.constraints.NotNull;
import java.util.Optional;

public interface UserRepository extends PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor {
  /**
   * 根据用户名查询用户
   */
  Optional<User> findByUsername(String username);

  default Page findAll(String username, String email, @NotNull Pageable pageable) {
    Assert.notNull(pageable, "传入的Pageable不能为null");
    Specification<User> specification = UserSpecs.containingName(username)
        .and(UserSpecs.containingEmail(email));
    return this.findAll(specification, pageable);
  }
}
