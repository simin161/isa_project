package com.fishyfinds.isa.Service;

import com.fishyfinds.isa.Model.beans.users.User;
import com.fishyfinds.isa.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@Service
public class LogInService {

    @Autowired
    private UserRepository userRepository;

    public boolean logIn(Map<String, String> credentials, HttpServletRequest request, HttpSession session) {
        boolean retVal = false;
        User user = userRepository.findByEmail(credentials.get("email"));
        if(user != null && user.isActivated() && checkPassword(user.getPassword(), credentials.get("password"))){
            retVal = true;
            session.invalidate();
            HttpSession newSession = request.getSession();
            newSession.setAttribute("user", user);
        }
        return retVal;
    }

    public User getLoggedUser(HttpSession session){
        return (User)session.getAttribute("user");
    }

    private boolean checkPassword(String userPassword,String enteredPassword){
        return userPassword.equals(enteredPassword);
    }
}
