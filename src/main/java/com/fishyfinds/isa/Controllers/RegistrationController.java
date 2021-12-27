package com.fishyfinds.isa.Controllers;
import com.fishyfinds.isa.Dto.CustomerRegistration;
import com.fishyfinds.isa.Mappers.DtoToUser;
import com.fishyfinds.isa.Model.beans.users.customers.Customer;
import com.fishyfinds.isa.Service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class RegistrationController {
    @Autowired
    private RegistrationService registrationService;
    @PostMapping("/registerUser")
    @PreAuthorize("hasRole('ADMIN')")
    public String registerUser(@RequestBody Map<String, String> message, HttpServletRequest request){
        registrationService.registerCustomer(DtoToUser.MapToCustomer(message), getSiteURL(request));
        return "";
    }

    @GetMapping("/verify")
    public String verifyUser(@Param("code") String code) {
        if (registrationService.verify(code)) {
            return "verify_success";
        } else {
            return "verify_fail";
        }
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }
}
