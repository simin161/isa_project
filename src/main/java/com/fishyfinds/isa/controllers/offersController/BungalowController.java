package com.fishyfinds.isa.controllers.offersController;

import com.fishyfinds.isa.mappers.DtoToOffer;
import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.service.offersService.BungalowService;
import com.fishyfinds.isa.service.offersService.OfferService;
import com.fishyfinds.isa.service.usersService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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

    @GetMapping("/allBungalows")
    public List<Bungalow> findAll(){
        return bungalowService.findAll();
    }

    @GetMapping("/allMyBungalows")
    public ArrayList<Offer> findAllByOwnerId(HttpServletRequest request) {
        User bungalowOwner = null;
        try{
            bungalowOwner = (User)request.getSession().getAttribute("user");
        }catch (Exception e){
            e.printStackTrace();
        }
        if(bungalowOwner != null){
            return offerService.getBungalowsByOwner(bungalowOwner);
        }
        return new ArrayList<Offer>();
    }

    @PostMapping("/addNewBungalow")
    public boolean addNewBungalow(@RequestBody Map<String, String> message, HttpServletRequest request){
        return bungalowService.addNewBungalow(DtoToOffer.MapToNewBungalow(message));
    }
}
