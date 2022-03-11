package com.fishyfinds.isa.service.offersService;

import com.fishyfinds.isa.mappers.DtoToOffer;
import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.enums.OfferType;
import com.fishyfinds.isa.model.enums.UserType;
import com.fishyfinds.isa.repository.LocationRepository;
import com.fishyfinds.isa.repository.offersRepository.BungalowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class BungalowService {

    @Autowired
    private BungalowRepository bungalowRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired OfferService offerService;

    public List<Bungalow> findAll(){
        return bungalowRepository.findAll();
    }

    public boolean addNewBungalow(Bungalow bungalow){
        boolean successfullyAdded = false;
        bungalow.setOfferType(OfferType.BUNGALOW);
        locationRepository.save(bungalow.getLocation());
        bungalowRepository.save(bungalow);
        successfullyAdded = true;
        return successfullyAdded;
    }

    public List<Bungalow> findByOwner(int ownerId){

        List<Bungalow> ownersBungalows = new ArrayList<Bungalow>();

        for(Bungalow b : bungalowRepository.findAll()){
            if(b.getUser().getId() == ownerId)
                ownersBungalows.add(b);
        }
        return ownersBungalows;
    }
}
