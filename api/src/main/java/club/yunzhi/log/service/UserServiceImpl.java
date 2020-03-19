package club.yunzhi.log.service;

import club.yunzhi.log.entity.User;
import club.yunzhi.log.filter.TokenFilter;
import club.yunzhi.log.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Optional;


/**
 * @author jincheng
 */
@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private final static Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    /** auth-token与teacherId的映射 */
    private HashMap<String, Long> authTokenUserIdHashMap = new HashMap<>();
    private final HttpServletRequest request;


    @Autowired
    public UserServiceImpl(UserRepository userRepository, HttpServletRequest request){
        this.userRepository = userRepository;
        this.request = request;
    }

    @Override
    public boolean login(String username, String password) {
       User user = this.userRepository.findByUsername(username);
        if (!this.validatePassword(user , password)) {
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
        if (user == null || user.getPassword() == null || password == null)
        {
            return false;
        }
        return user.getPassword().equals(password);
    }
    @Override
    public void logout() {
        // 获取auth-token
        String authToken = this.request.getHeader(TokenFilter.TOKEN_KEY);
        logger.info("获取到的auth-token为" + this.request.getHeader(TokenFilter.TOKEN_KEY));

        // 删除hashMap中对应auth-token的映射
        this.authTokenUserIdHashMap.remove(authToken);
    }
    @Override
    public User me(){
        // 获取authToken
        String authToken = this.request.getHeader(TokenFilter.TOKEN_KEY);

        // 获取authToken映射的userId
        Long userId = this.authTokenUserIdHashMap.get(authToken);
        if (userId == null) {
            // 未获取到userId，说明该auth-token未与用户进行绑定，返回null
            return null;
        }

        // 如获取到userId，则由数据库中获取user并返回
        Optional<User> userOptional = this.userRepository.findById(userId);
        return userOptional.get();
    }
}
