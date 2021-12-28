package com.fishyfinds.isa.Controllers.OffersController;


import com.fishyfinds.isa.Model.beans.offers.boats.Boat;
import com.fishyfinds.isa.Service.OffersService.BoatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class BoatController {

    @Autowired
    private BoatService boatService;

    @GetMapping("/allBoats")
    public List<Boat> findAll(){
        return boatService.findAll();
    }

}
