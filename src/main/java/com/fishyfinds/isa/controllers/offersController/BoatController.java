package com.fishyfinds.isa.controllers.offersController;


import com.fishyfinds.isa.dto.OfferDTO;
import com.fishyfinds.isa.model.beans.Subscriber;
import com.fishyfinds.isa.model.beans.offers.boats.Boat;
import com.fishyfinds.isa.security.TokenUtils;
import com.fishyfinds.isa.service.SubscriberService;
import com.fishyfinds.isa.service.offersService.BoatService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class BoatController {

    @Autowired
    private BoatService boatService;
    @Autowired
    private SubscriberService subscriberService;
    @Autowired
    private TokenUtils tokenUtils;

    @GetMapping("/allBoats")
    public List<OfferDTO> findAll(@RequestHeader("Authorization") HttpHeaders header){
        List<Boat> boats  = boatService.findAll();
        List<OfferDTO> retVal = new ArrayList<OfferDTO>();
        try {
            final String value = header.getFirst(HttpHeaders.AUTHORIZATION);
            if(value != null && !value.isEmpty()){
                final JSONObject obj = new JSONObject(value);
                String user = obj.getString("accessToken");
                String username = tokenUtils.getUsernameFromToken(user);
                List<Subscriber> subscribers = subscriberService.getSubscriptionsByUser(username);
                for(Boat b : boats){
                    OfferDTO dto = new OfferDTO();
                    dto.setPath(b.getImages().stream().filter(i -> i.getName().equals("first")).collect(Collectors.toList()).get(0).getPath());
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
                for(Boat b : boats){
                    OfferDTO dto = new OfferDTO();
                    dto.setPath(b.getImages().stream().filter(i -> i.getName().equals("first")).collect(Collectors.toList()).get(0).getPath());
                    dto.setOffer(b);
                    retVal.add(dto);
                }
            }
        }catch(Exception e){

        }
        return retVal;
    }

}
