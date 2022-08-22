package com.fishyfinds.isa.controllers.termsController;

import com.fishyfinds.isa.security.TokenUtils;
import com.fishyfinds.isa.service.termsService.ReservationService;
import com.fishyfinds.isa.service.termsService.TermService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private TokenUtils tokenUtils;

    @PostMapping("/makeReservation")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public boolean makeReservation(@RequestHeader HttpHeaders header,
                                   @RequestBody Map<String, String> message){
        try {
            final String value =header.getFirst(HttpHeaders.AUTHORIZATION);
            final JSONObject obj = new JSONObject(value);
            String user = obj.getString("accessToken");
            String username = tokenUtils.getUsernameFromToken(user);
            return reservationService.makeReservation(message, username);

        }catch(Exception e){
        }

        return false;
    }

    @PostMapping("/makeReservationAction")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public boolean makeReservationWithCaptain(@RequestHeader HttpHeaders header,
                                            @RequestBody String id){
        try {
            final String value =header.getFirst(HttpHeaders.AUTHORIZATION);
            final JSONObject obj = new JSONObject(value);
            String user = obj.getString("accessToken");
            String username = tokenUtils.getUsernameFromToken(user);
            return reservationService.makeReservationAction(Long.valueOf(id), username);

        }catch(Exception e){
        }

        return false;
    }

    @PutMapping("/cancelReservation")
    public boolean cancelReservation(@RequestBody String id){
        return reservationService.cancelReservation(Long.parseLong(id));
    }

}
