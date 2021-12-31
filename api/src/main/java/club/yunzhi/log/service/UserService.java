package club.yunzhi.log.service;

import club.yunzhi.log.entity.User;
import club.yunzhi.log.vo.VUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.validation.constraints.NotNull;


/**
 * @author jincheng
 */
public interface UserService {
  /**
   * 用户登录
   *
   * @param username 用户名
   * @param password 密码
   * @return 成功 true
   */
  boolean login(String username, String password);

  /**
   * 验证密码的有效性
   *
   * @param user     用户
   * @param password 密码
   * @return 有效 true
   */
  boolean validatePassword(User user, String password);

  /**
   * 获取当前登陆用户
   *
   * @return 当前登录用户。用户未登录则返回null
   */
  User getCurrentLoginUser();


  /**
   * 保存
   *
   * @param user 保存前的用户
   * @return 保存后的用户
   */
  User save(User user);

  /**
   * 查询分页信息
   *
   * @param pageable 分页条件
   * @return 分页数据
   */
  Page<User> findAll(Pageable pageable);

  /**
   * 查询分页信息
   *
   * @param username 用户名
   * @param email    邮件
   * @param pageable 分页条件
   * @return 分页数据
   */
  Page<User> findAll(String username, String email, Pageable pageable);


  /**
   * 查找用户
   *
   * @param id 用户ID
   * @return 用户
   */
  User findById(@NotNull Long id);

  /**
   * 更新用户
   *
   * @param id   ID
   * @param user 更新的用户信息
   * @return 用户
   */
  User update(Long id, User user);

  /**
   * 删除用户
   *
   * @param id 用户id
   */
  void deleteById(Long id);


  /**
   * 判断用户是否登录
   *
   * @param authToken 认证令牌
   * @return
   */
  boolean isLogin(String authToken);

  /**
   * 重置密码
   *
   * @param id
   */
  void resetPassword(Long id);

  void updatePassword(VUser vUser);

  boolean validateOldPassword(VUser vUser);
}

