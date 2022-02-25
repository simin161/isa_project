package com.fishyfinds.isa.service.offersService;

import com.fishyfinds.isa.model.beans.offers.boats.Boat;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.repository.offersRepository.BoatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BoatService {

    @Autowired
    private BoatRepository boatRepository;
    @Autowired
    private OfferService offerService;
    public List<Boat> findAll(){
        return boatRepository.findAll();
    }

    public List<Boat> searchBoats(String boatName, String boatLocation){
        if( boatName.trim().equals("") && boatLocation.trim().equals(""))
            return boatRepository.findAll();

        List<Boat> retVal = new ArrayList<Boat>();

        for(Boat boat : boatRepository.findAll()){
            if(offerService.checkPatternOffer(boat.getId(), boatName, boatLocation))
                retVal.add(boat);
        }

        return retVal;
    }
}
