package com.fishyfinds.isa.controllers.offersController;

import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.security.TokenUtils;
import com.fishyfinds.isa.service.AuthenticationService;
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


    @GetMapping("/allBungalows")
    public List<Bungalow> findAll(){
        return bungalowService.findAll();
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
            e.printStackTrace();
        }
        return new ArrayList<Bungalow>();
    }

    @PostMapping("/addNewBungalow")
    public boolean addNewBungalow(@RequestHeader("Authorization") HttpHeaders header, @RequestBody Map<String, String> message){
        try {
            final String value =header.getFirst(HttpHeaders.AUTHORIZATION);
            final JSONObject obj = new JSONObject(value);
            String user = obj.getString("accessToken");
            String username = tokenUtils.getUsernameFromToken(user);
            return bungalowService.addNewBungalow(username, message);
        }catch(Exception e){
            e.printStackTrace();
        }
        return  false;
    }
}
