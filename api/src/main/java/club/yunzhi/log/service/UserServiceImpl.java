package club.yunzhi.log.service;

import club.yunzhi.log.entity.User;
import club.yunzhi.log.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * @author jincheng
 */
@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    @Override
    public boolean login(String username, String password) {
       User user = this.userRepository.findByUsername(username);
       return this.validatePassword(user,password);
    }

    @Override
    public boolean validatePassword(User user, String password) {
        if (user == null || user.getPassword() == null || password == null)
        {
            return false;
        }
        return user.getPassword().equals(password);
    }
}
