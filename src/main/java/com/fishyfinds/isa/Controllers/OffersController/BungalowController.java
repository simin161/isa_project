package com.fishyfinds.isa.Controllers.OffersController;

import com.fishyfinds.isa.Model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.Service.OffersService.BungalowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class BungalowController {

    @Autowired
    private BungalowService bungalowService;

    @GetMapping("/allBungalows")
    public List<Bungalow> findAll(){
        return bungalowService.findAll();
    }
}
