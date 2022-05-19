package com.fishyfinds.isa.controllers.termsController;

import com.fishyfinds.isa.dto.TermDto;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.security.TokenUtils;
import com.fishyfinds.isa.service.AuthenticationService;
import com.fishyfinds.isa.service.offersService.BungalowService;
import com.fishyfinds.isa.service.offersService.OfferService;
import com.fishyfinds.isa.service.termsService.BungalowTermService;
import com.fishyfinds.isa.service.usersService.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class BungalowTermController {

    @Autowired
    private BungalowTermService bungalowTermService;
    @Autowired
    private BungalowService bungalowService;
    @Autowired
    private UserService userService;
    @Autowired
    private OfferService offerService;
    @Autowired
    private TokenUtils tokenUtils;
    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping("/bungalow/getBungalowTimeSlots/{bungalowId}")
    public List<TermDto> findAll(@PathVariable Long bungalowId) {
        return bungalowTermService.findAllByBungalowId(bungalowId);
    }

    @PostMapping("/bungalow/addNewTimeSlotToBungalow/{bungalowId}")
    public boolean addNewTimeSlotsToBungalow(@RequestHeader("Authorization") HttpHeaders header,
                                             @PathVariable Long bungalowId,
                                             @RequestBody TermDto termDto){
        try {
            System.out.println("Endpoint: /bungalow/addNewTimeSlotToBungalow/{bungalowId}");
            final String value =header.getFirst(HttpHeaders.AUTHORIZATION);
            final JSONObject obj = new JSONObject(value);
            String user = obj.getString("accessToken");
            String username = tokenUtils.getUsernameFromToken(user);
            Bungalow bungalow = bungalowService.findByBungalowId(bungalowId);
            return bungalowTermService.addNewTimeSlotToBungalow(bungalow, termDto);
        }catch(Exception e){
            e.printStackTrace();
        }
        return  false;
    }


}
