package com.fishyfinds.isa.controllers;

import com.fishyfinds.isa.model.beans.LoyaltyProgram;
import com.fishyfinds.isa.security.TokenUtils;
import com.fishyfinds.isa.service.AuthenticationService;
import com.fishyfinds.isa.service.LoyaltyProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class LoyaltyProgramController {
    @Autowired
    private LoyaltyProgramService loyaltyProgramService;
    @Autowired
    private TokenUtils tokenUtils;
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/addNewLoyaltyCategory")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public boolean addNewLoyalty(@RequestBody Map<String, String> message){
        try{
            loyaltyProgramService.addNewLoyalty(message);
            return true;
        }catch (Exception e){
            System.out.print(e.toString());
            return false;
        }
    }

    @PostMapping("/deleteLoyaltyCategory")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public boolean deleteLoyalty(@RequestBody Map<String, String> message){
        try{
            loyaltyProgramService.deleteLoyalty(message);
            return true;
        }catch (Exception e){
            System.out.print(e.toString());
            return false;
        }
    }

    @GetMapping("/getAllLoyaltyCategories")
    public List<LoyaltyProgram> getAllLoyalties(){
        try{
            return loyaltyProgramService.getAllLoyalties();
        }catch (Exception e){
            return new ArrayList<>();
        }
    }
}
