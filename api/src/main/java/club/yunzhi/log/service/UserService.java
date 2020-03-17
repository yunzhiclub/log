package club.yunzhi.log.service;

import club.yunzhi.log.entity.User;

public interface UserService {
    /**
     * 用户登录
     * @param username 用户名
     * @param password 密码
     * @return 成功 true
     */
    boolean login(String username, String password);

    /**
     * 验证密码的有效性
     * @param user 用户
     * @param password 密码
     * @return 有效 true
     */
    boolean validatePassword(User user, String password);
}

