package com.fishyfinds.isa.controllers.offersController;

import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.offers.boats.Boat;
import com.fishyfinds.isa.model.enums.OfferType;
import com.fishyfinds.isa.service.offersService.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class OfferController {

    @Autowired
    private OfferService offerService;

    @GetMapping("/search")
    public List<? extends Offer> searchBungalows(@RequestParam(name = "name", required = false) String name, //location = address + num + city + country
                                                 @RequestParam(name = "location", required = false) String location,
                                                 @RequestParam(name = "type", required = true) OfferType type){
        return offerService.search(name, location, type);
    }
}
