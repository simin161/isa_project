package com.fishyfinds.isa.controllers.offersController;

import com.fishyfinds.isa.dto.OfferDTO;
import com.fishyfinds.isa.model.beans.Subscriber;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.security.TokenUtils;
import com.fishyfinds.isa.service.AuthenticationService;
import com.fishyfinds.isa.service.SubscriberService;
import com.fishyfinds.isa.service.offersService.BungalowService;
import com.fishyfinds.isa.service.offersService.OfferService;
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
@RequestMapping(value="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class BungalowController {

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
    @Autowired
    private SubscriberService subscriberService;

    @GetMapping("/allBungalows")
    public List<OfferDTO> findAll(@RequestHeader("Authorization") HttpHeaders header){
        List<Bungalow> bungalows  = bungalowService.findAll();
        List<OfferDTO> retVal = new ArrayList<OfferDTO>();
        try {
            final String value = header.getFirst(HttpHeaders.AUTHORIZATION);
            if(value != null && !value.isEmpty()){
            final JSONObject obj = new JSONObject(value);
            String user = obj.getString("accessToken");
            String username = tokenUtils.getUsernameFromToken(user);
            List<Subscriber> subscribers = subscriberService.getSubscriptionsByUser(username);
            for(Bungalow b : bungalows){
                OfferDTO dto = new OfferDTO();
                dto.setOffer(b);
                for(Subscriber s : subscribers){
                    if(s.isRelevant() && s.getFollowing().getId().equals(b.getId())){
                        dto.setFollowed(true);
                        break;
                    }
                }
                retVal.add(dto);
            }}
            else{
                for(Bungalow b : bungalows){
                    OfferDTO dto = new OfferDTO();
                    dto.setOffer(b);
                    retVal.add(dto);
                }
            }
        }catch(Exception e){

        }
        return retVal;
    }

    @GetMapping("/allMyBungalows")
    public List<Bungalow> findAllByOwnerId(@RequestHeader("Authorization") HttpHeaders header) {
        try {
            final String value =header.getFirst(HttpHeaders.AUTHORIZATION);
            final JSONObject obj = new JSONObject(value);
            String user = obj.getString("accessToken");
            String username = tokenUtils.getUsernameFromToken(user);
            User owner = userService.findUserByEmail(username);
            return bungalowService.findAllByOwnerId(owner.getId());
        }catch(Exception e){
        }
        return new ArrayList<Bungalow>();
    }

    @PostMapping("/addNewBungalow")
    public boolean addNewBungalow(@RequestHeader("Authorization") HttpHeaders header, @RequestBody Map<String, ArrayList<String>> message){
        try {
            final String value =header.getFirst(HttpHeaders.AUTHORIZATION);
            final JSONObject obj = new JSONObject(value);
            String user = obj.getString("accessToken");
            String username = tokenUtils.getUsernameFromToken(user);
            return bungalowService.addNewBungalow(username, message);
        }catch(Exception e){
        }
        return  false;
    }
}
