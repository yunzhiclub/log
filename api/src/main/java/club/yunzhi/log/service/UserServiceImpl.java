package club.yunzhi.log.service;

import club.yunzhi.log.entity.User;


public class UserServiceImpl implements UserService {

    @Override
    public boolean login(String username, String password) {
        return false;
    }

    @Override
    public boolean validatePassword(User user, String password) {
        return false;
    }
}
