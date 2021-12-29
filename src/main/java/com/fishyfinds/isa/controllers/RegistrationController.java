package com.fishyfinds.isa.controllers;

import com.fishyfinds.isa.mappers.DtoToUser;
import com.fishyfinds.isa.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class RegistrationController {
    @Autowired
    private RegistrationService registrationService;
    @PostMapping("/registerUser")
    @PreAuthorize("hasRole('ADMIN')")
    public boolean registerUser(@RequestBody Map<String, String> message, HttpServletRequest request){
        return registrationService.registerCustomer(DtoToUser.MapToCustomer(message), getSiteURL(request));
    }

    @GetMapping("/verify")
    public String verifyUser(@Param("code") String code) {
        return registrationService.verify(code) ? "verify_success" : "verify_fail";
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }
}
