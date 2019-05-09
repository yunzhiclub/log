package club.yunzhi.log.controller;

import club.yunzhi.log.entity.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * @author panjie
 * 用户登录
 */
@RestController
@RequestMapping("login")
public class LoginController {

    @PostMapping("account")
    public User count(@RequestBody User user, final HttpSession httpSession) {
        final String id = httpSession.getId();
        user.setToken(id);
        return user;
    }
}
