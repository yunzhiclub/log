package club.yunzhi.log.controller;

import club.yunzhi.log.entity.User;
import club.yunzhi.log.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


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
}
