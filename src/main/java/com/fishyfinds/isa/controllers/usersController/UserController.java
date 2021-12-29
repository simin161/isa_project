package com.fishyfinds.isa.controllers.usersController;

import com.fishyfinds.isa.service.usersService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping("/changePassword")
    public boolean changePassword(@RequestBody Map<String, String> message){
        return userService.changePassword(message);
    }
}
