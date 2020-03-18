package club.yunzhi.log.controller;

import club.yunzhi.log.entity.User;
import club.yunzhi.log.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


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
}
