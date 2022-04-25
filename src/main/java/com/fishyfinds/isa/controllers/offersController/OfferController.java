package com.fishyfinds.isa.controllers.offersController;

import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.offers.boats.Boat;
import com.fishyfinds.isa.model.enums.OfferType;
import com.fishyfinds.isa.service.offersService.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class OfferController {

    @Autowired
    private OfferService offerService;

    @GetMapping("/search")
    public List<? extends Offer> searchBungalows(@RequestParam(name = "name", required = false) String name, //location = address + num + city + country
                                                 @RequestParam(name = "location", required = false) String location,
                                                 @RequestParam(name = "type", required = true) OfferType type,
                                                 @RequestParam(name = "firstLastName", defaultValue = "", required = false) String firstAndLastName){
        return offerService.search(name, location, type, firstAndLastName);
    }

    @GetMapping("/search/{loggedUserId}")
    public List<? extends Offer> searchMyBungalows(@PathVariable Long loggedUserId,
                                                   @RequestParam(name = "name", required = false) String name, //location = address + num + city + country
                                                   @RequestParam(name = "location", required = false) String location,
                                                   @RequestParam(name = "type", required = true) OfferType type,
                                                   @RequestParam(name = "firstLastName", defaultValue = "", required = false) String firstAndLastName){
        return offerService.searchMyOffers(loggedUserId, name, location, type, firstAndLastName);
    }
}
