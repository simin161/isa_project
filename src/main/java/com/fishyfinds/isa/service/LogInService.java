package com.fishyfinds.isa.service;

import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.repository.usersRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
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

    public User getLoggedUser(HttpServletRequest request){
        return (User)request.getSession().getAttribute("user");
    }

    private boolean checkPassword(String userPassword,String enteredPassword){
        return userPassword.equals(enteredPassword);
    }

    public void logOut(HttpSession session) {
        SecurityContextHolder.clearContext();
        User user = (User) session.getAttribute("user");
        if(user != null){
            session.invalidate();
        }
    }
}
