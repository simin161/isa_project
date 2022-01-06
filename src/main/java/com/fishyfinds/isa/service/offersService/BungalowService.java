package com.fishyfinds.isa.service.offersService;

import com.fishyfinds.isa.mappers.DtoToOffer;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.enums.OfferType;
import com.fishyfinds.isa.model.enums.UserType;
import com.fishyfinds.isa.repository.LocationRepository;
import com.fishyfinds.isa.repository.offersRepository.BungalowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BungalowService {

    @Autowired
    private BungalowRepository bungalowRepository;

    @Autowired
    private LocationRepository locationRepository;

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









}
