package club.yunzhi.log.controller;

import club.yunzhi.log.entity.User;
import club.yunzhi.log.service.UserService;
import club.yunzhi.log.vo.VUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


/**
 * @author jincheng
 */
@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("login")
    public boolean login(@RequestBody User user)
   {
    return this.userService.login(user.getUsername(), user.getPassword());
   }
    @GetMapping("logout")
    public void login() {
        this.userService.logout();
    }
    @GetMapping("me")
    public User me(){
        return this.userService.me();
    }

    @GetMapping
    public Page<User> getAll(@RequestParam(required = false) String username,
                             @RequestParam(required = false) String email,
                             Pageable pageable) {
        return this.userService.findAll(
                username,
                email,
                pageable);
    }

    @PostMapping("validateOldPassword")
    public boolean validateOldPassword (@RequestBody VUser vUser)
    {return this.userService.validateOldPassword(vUser);}

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
    public User save(@RequestBody User user) {
        return userService.save(user);
    }

    @PutMapping("{id}")
    public User update(@PathVariable Long id, @RequestBody User user) {
        return this.userService.update(id, user);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        this.userService.deleteById(id);
    }

    @PutMapping("resetPassword/{id}")
    public void resetPassword(@PathVariable Long id){
        userService.resetPassword(id);
    }
}
