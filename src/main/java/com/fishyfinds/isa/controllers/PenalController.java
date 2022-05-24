package com.fishyfinds.isa.controllers;

import com.fishyfinds.isa.mappers.DtoToAccountDeletionRequest;
import com.fishyfinds.isa.model.beans.Penal;
import com.fishyfinds.isa.security.TokenUtils;
import com.fishyfinds.isa.service.PenalService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class PenalController {
    @Autowired
    private TokenUtils tokenUtils;
    @Autowired
    private PenalService penalService;

    @GetMapping("/getPenalForUser")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public Penal getPenalForUser(@RequestHeader("Authorization") HttpHeaders headers){
        final String value =headers.getFirst(HttpHeaders.AUTHORIZATION);
        try {
            final JSONObject obj = new JSONObject(value);
            String user = obj.getString("accessToken");
            String username = tokenUtils.getUsernameFromToken(user);
            return penalService.getPenalForUser(username);
        }catch(Exception e){
            return null;
        }
    }
}
