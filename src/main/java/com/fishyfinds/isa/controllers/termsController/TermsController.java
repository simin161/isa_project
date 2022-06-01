package com.fishyfinds.isa.controllers.termsController;

import com.fishyfinds.isa.dto.TermDto;
import com.fishyfinds.isa.model.beans.Term;
import com.fishyfinds.isa.service.termsService.TermsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class TermsController {
    @Autowired
    private TermsService termService;

    @PostMapping("/filterAvailableTerms")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public List<TermDto> filterAvailableTerms(@RequestBody Map<String, String> message){
        return termService.filterAvailableTerms(message);
    }

    @PostMapping("/makeReservation")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public boolean makeReservation(@RequestHeader HttpHeaders header, @RequestBody Map<String, String> message){
        return termService.makeReservation(message);
    }
}
