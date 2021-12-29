package com.fishyfinds.isa.service.usersService;

import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.repository.usersRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public boolean changeProfile(User user) {
        boolean retVal = false;
        if(userRepository.findById(user.getId()).orElse(null) != null){
            userRepository.save(user);
            retVal = true;
        }
        return retVal;
    }
}
