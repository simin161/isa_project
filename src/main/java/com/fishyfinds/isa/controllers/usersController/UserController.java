package com.fishyfinds.isa.controllers.usersController;

import com.fishyfinds.isa.mappers.DtoToUser;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.service.usersService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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

    @PutMapping("/changeProfile")
    public boolean changeProfile(@RequestBody Map<String,String> message, HttpServletRequest request){
        return userService.changeProfile(DtoToUser.MapToUser(message), request);
    }

    @GetMapping("/findUser")
    public User findUser(Long id){
        return userService.findUser(id);
    }
}
