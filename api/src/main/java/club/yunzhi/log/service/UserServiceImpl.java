package club.yunzhi.log.service;

import club.yunzhi.log.entity.User;
import club.yunzhi.log.filter.TokenFilter;
import club.yunzhi.log.properties.AppProperties;
import club.yunzhi.log.repository.UserRepository;
import club.yunzhi.log.repository.specs.UserSpecs;
import club.yunzhi.log.vo.VUser;
import com.mengyunzhi.core.exception.ObjectNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;


/**
 * @author jincheng, haozelong
 */
@Service
public class UserServiceImpl implements UserService, UserDetailsService {
  private UserRepository userRepository;
  private AppProperties appProperties;
  private final static Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
  /**
   * auth-token与teacherId的映射
   */
  private HashMap<String, Long> authTokenUserIdHashMap = new HashMap<>();
  private final HttpServletRequest request;


  @Autowired
  public UserServiceImpl(UserRepository userRepository,
                         HttpServletRequest request,
                         AppProperties appProperties) {
    this.userRepository = userRepository;
    this.request = request;
    this.appProperties = appProperties;
  }

  @Override
  public boolean login(String username, String password) {
    User user = this.userRepository.findByUsername(username)
        .orElseThrow(() -> new EntityNotFoundException("用户实体不存在"));
    if (!this.validatePassword(user, password)) {
      // 认证不成功直接返回
      return false;
    }

    // 认证成功，进行auth-token与teacherId的绑定绑定
    logger.info("获取到的auth-token为" + this.request.getHeader(TokenFilter.TOKEN_KEY));
    this.authTokenUserIdHashMap.put(this.request.getHeader(TokenFilter.TOKEN_KEY), user.getId());
    return true;
  }

  @Override
  public boolean validatePassword(User user, String password) {
    if (user == null || user.getPassword() == null || password == null) {
      return false;
    }
    return user.getPassword().equals(password);
  }

  @Override
  public User getCurrentLoginUser() {
    logger.debug("初始化用户");
    User user = new User();

    logger.debug("获取用户认证信息");
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    logger.debug("根据认证信息查询用户");
    if (authentication != null && authentication.isAuthenticated()) {
      user = userRepository.findByUsername(authentication.getName())
          .orElseThrow(() -> new EntityNotFoundException("用户实体不存在"));
    }

    return user;
  }


  @Override
  public String save(User user) {
    logger.debug("密码设置为初始密码");
    user.setPassword(appProperties.getPassword());
    this.userRepository.save(user);
    return appProperties.getPassword();
  }

  @Override
  public Page<User> findAll(Pageable pageable) {
    return this.userRepository.findAll(pageable);
  }

  @Override
  public Page<User> findAll(String name, String username, Pageable pageable) {
    Assert.notNull(pageable, "Pageable不能为null");
    return this.userRepository.findAll(UserSpecs.containingName(name)
        .and(UserSpecs.containingUsername(username)), pageable);
  }

  @Override
  public User findById(@NotNull Long id) {
    Assert.notNull(id, "id不能为null");
    return this.userRepository.findById(id).get();
  }

  @Override
  public User update(Long id, User user) {
    User oldStudent = this.userRepository.findById(id).get();
    return this.updateFields(user, oldStudent);
  }

  @Override
  public void deleteById(@NotNull Long id) {
    Assert.notNull(id, "传入的ID不能为NULL");
    this.userRepository.deleteById(id);
  }

  /**
   * 更新学生
   *
   * @param newUser 新用户信息
   * @param oldUser 老用户信息
   * @return 更新后的用户信息
   */
  public User updateFields(User newUser, User oldUser) {
    oldUser.setUsername(newUser.getUsername());
    oldUser.setName(newUser.getName());
    oldUser.setEmail(newUser.getEmail());
    return this.userRepository.save(oldUser);
  }

  @Override
  public boolean isLogin(String authToken) {
    // 获取authToken映射的teacherId
    Long userId = this.authTokenUserIdHashMap.get(authToken);
    return userId != null;

  }

  @Override
  public boolean validateOldPassword(VUser vUser) {
    if (this.getCurrentLoginUser() == null || this.getCurrentLoginUser().getPassword() == null || vUser.getPassword() == null) {
      return false;
    }
    return this.getCurrentLoginUser().getPassword().equals(vUser.getPassword());
  }

  @Override
  public void updatePassword(VUser vUser) {
    logger.debug("获取当前用户");
    User currentUser = this.getCurrentLoginUser();
    logger.debug("更新密码");
    currentUser.setPassword(vUser.getNewPassword());
    this.userRepository.save(currentUser);
  }

  @Override
  public String resetPassword(Long id) {
    logger.debug("获取学生对应的用户信息");
    Optional<User> userOptional = userRepository.findById(id);
    if (!userOptional.isPresent()) {
      throw new ObjectNotFoundException("未找到相关用户");
    }
    userOptional.get().setPassword(this.appProperties.getPassword());
    userRepository.save(userOptional.get());
    return this.appProperties.getPassword();
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = this.userRepository.findByUsername(username)
        .orElseThrow(() -> new EntityNotFoundException("用户实体不存在"));

    // 设置用户角色
    List<SimpleGrantedAuthority> authorities = new ArrayList<>();

    return new org.springframework.security.core.userdetails.User(username, user.getPassword(), authorities);
  }
}
