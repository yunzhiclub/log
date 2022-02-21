package club.yunzhi.log.controller;

import club.yunzhi.log.entity.User;
import club.yunzhi.log.repository.UserRepository;
import club.yunzhi.log.service.UserService;
import club.yunzhi.log.vo.VUser;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;


/**
 * @author jincheng
 */
@RestController
@RequestMapping("user")
public class UserController {
  @Autowired
  UserService userService;

  @Autowired
  UserRepository userRepository;

  @RequestMapping("login")
  @JsonView(LoginJsonView.class)
  public User login(Principal user) {
    return this.userRepository.findByUsername(user.getName())
        .orElseThrow(() ->
            new EntityNotFoundException("未在数据库中找到用户，这可能是当前用户被删除导致的"));
  }

  @GetMapping("logout")
  public void logout(HttpServletRequest request, HttpServletResponse response) {
    // 获取用户认证信息
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    // 存在认证信息，注销
    if (authentication != null) {
      new SecurityContextLogoutHandler().logout(request, response, authentication);
    }
  }

  @GetMapping("me")
  public User getCurrentLoginUser() {
    return this.userService.getCurrentLoginUser();
  }

  @GetMapping("page")
  @JsonView(GetAllJsonView.class)
  public Page<User> getAll(@RequestParam(required = false) String name,
                           @RequestParam(required = false) String username,
                           final @SortDefault(value = "id", direction = Sort.Direction.DESC) Pageable pageable) {
    return this.userService.findAll(
        name,
        username,
        pageable);
  }

  @PostMapping("checkPasswordIsRight")
  public boolean validateOldPassword(@RequestBody VUser vUser) {
    return this.userService.validateOldPassword(vUser);
  }

  @GetMapping("existByUsername")
  public boolean existByUsername(@RequestParam String username) {
    return this.userService.existByUsername(username);
  }

  /**
   * 修改密码
   *
   * @param vUser 带有新密码和旧密码VUser
   */
  @PutMapping("updatePassword")
  public void updatePassword(@RequestBody VUser vUser) {
    this.userService.updatePassword(vUser);
  }

  @GetMapping("{id}")
  public User getById(@PathVariable Long id) {
    return this.userService.findById(id);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  @JsonView(SaveJsonView.class)
  public String save(@RequestBody User user) {
    return userService.save(user);
  }

  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  public User update(@PathVariable Long id, @RequestBody User user) {
    return this.userService.update(id, user);
  }

  @DeleteMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteById(@PathVariable Long id) {
    this.userService.deleteById(id);
  }

  @PatchMapping("resetPassword/{id}")
  public String resetPassword(@PathVariable Long id) {
    return userService.resetPassword(id);
  }


  public class LoginJsonView {
  }

  public class SaveJsonView {
  }

  public class UpdateJsonView {
  }

  public class GetAllJsonView {
  }
}
