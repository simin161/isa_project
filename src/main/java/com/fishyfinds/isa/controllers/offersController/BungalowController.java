package com.fishyfinds.isa.controllers.offersController;

import com.fishyfinds.isa.mappers.DtoToOffer;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.service.offersService.BungalowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class BungalowController {

    @Autowired
    private BungalowService bungalowService;

    @GetMapping("/allBungalows")
    public List<Bungalow> findAll(){
        return bungalowService.findAll();
    }

    @PostMapping("/addNewBungalow")
    public boolean addNewBungalow(@RequestBody Map<String, String> message, HttpServletRequest request){
        return bungalowService.addNewBungalow(DtoToOffer.MapToNewBungalow(message));
    }

    @GetMapping("/allOwnerBungalows")
    public List<Bungalow> findByOwner(int ownerId) {
        return bungalowService.findByOwner(ownerId);
    }
}
