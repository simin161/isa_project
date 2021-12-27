package com.fishyfinds.isa.Controllers;

import com.fishyfinds.isa.Mappers.DtoToUser;
import com.fishyfinds.isa.Model.beans.users.User;
import com.fishyfinds.isa.Service.LogInService;
import com.fishyfinds.isa.Service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class LogInController {

    @Autowired
    private LogInService logInService;

    @PostMapping("/logIn")
    @PreAuthorize("hasRole('ADMIN')")
    public boolean logIn(@RequestBody Map<String, String> message, HttpServletRequest request, HttpSession session){
        return logInService.logIn(message, request, session);
    }

    @GetMapping("/logOut")
    @PreAuthorize("hasRole('ADMIN')")
    public void logOut(HttpSession session){
        logInService.logOut(session);
    }
    @GetMapping("/getLoggedUser")
    @PreAuthorize("hasRole('ADMIN')")
    public User getLoggedUser(HttpServletRequest request){
        return logInService.getLoggedUser(request);

        }
}
