package club.yunzhi.log.controller;

import club.yunzhi.log.entity.User;
import club.yunzhi.log.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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
    public Page<User> getAll(@RequestParam int page,
                             @RequestParam int size) {
        return this.userService.findAll(PageRequest.of(page, size));
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
}
