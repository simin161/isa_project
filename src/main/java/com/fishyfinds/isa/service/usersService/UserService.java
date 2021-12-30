package com.fishyfinds.isa.service.usersService;

import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.repository.usersRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean changePassword(Map<String, String> password){
        boolean retVal = false;
        User user = userRepository.findById(Long.valueOf(password.get("id"))).orElse(null);
        if(user != null){
            user.setPassword(password.get("newPassword"));
            userRepository.save(user);
            retVal = true;
        }
        return retVal;
    }

    public boolean changeProfile(User updatedUser, HttpServletRequest request) {
        boolean retVal = false;
        User user = userRepository.findById(updatedUser.getId()).orElse(null);
        if(user != null){
            user.update(updatedUser);
            userRepository.save(user);
            request.getSession().setAttribute("user", user);
            retVal = true;
        }
        return retVal;
    }
}
