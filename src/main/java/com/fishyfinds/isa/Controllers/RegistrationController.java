package com.fishyfinds.isa.Controllers;
import com.fishyfinds.isa.Dto.CustomerRegistration;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class RegistrationController {

    @PostMapping("/registerUser")
    @PreAuthorize("hasRole('ADMIN')")
    public String registerUser(@RequestBody Map<String, String> message){

        return message.get("phoneNumber");
    }
}
