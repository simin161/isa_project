package com.fishyfinds.isa.controllers;

import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/signIn")
    @PreAuthorize("hasRole('ADMIN')")
    public boolean logIn(@RequestBody Map<String, String> message, HttpServletRequest request, HttpSession session){
        return authenticationService.signIn(message, request, session);
    }

    @GetMapping("/signOut")
    @PreAuthorize("hasRole('ADMIN')")
    public void signOut(HttpSession session){
        authenticationService.signOut(session);
    }

    @GetMapping("/authenticateUser")
    @PreAuthorize("hasRole('ADMIN')")
    public User authenticateUser(HttpServletRequest request){
        return authenticationService.authenticateUser(request);

        }
}
