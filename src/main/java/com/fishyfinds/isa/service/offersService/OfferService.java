package com.fishyfinds.isa.service.offersService;

import com.fishyfinds.isa.model.beans.offers.Location;
import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.offers.boats.Boat;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.enums.OfferType;
import com.fishyfinds.isa.repository.offersRepository.BoatRepository;
import com.fishyfinds.isa.repository.offersRepository.BungalowRepository;
import com.fishyfinds.isa.repository.offersRepository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class OfferService {

    @Autowired
    private  OfferRepository offerRepository;
    @Autowired
    private BoatRepository boatRepository;
    @Autowired
    private BungalowRepository bungalowRepository;

    public List<? extends Offer> search(String name, String location, OfferType type){
        List<? extends Offer> searched;

        if(type == OfferType.BUNGALOW) {
            searched = bungalowRepository.findAll();
        }
        else{  //can be extended to work with courses - add else if and check  the type <3
            searched = boatRepository.findAll();
        }

        if(name.equals("") && location.equals(""))
            return searched;

        List<Offer> retVal = new ArrayList<>();
        for(int i = 0; i < searched.size(); ++i){
            if(checkPatternOffer(searched.get(i).getId(), name, location)) {
                retVal.add(searched.get(i));
            }
        }


        return retVal;
    }

    private  boolean checkPatternOffer(Long id, String name, String location){
        Offer offer = offerRepository.findById(id).orElseGet(null);
        if(!name.equals("") && !location.equals(""))
            return checkPatternName(offer.getOfferName(), name) && checkPatternLocation(offer.getLocation(), location);
        return checkPatternName(offer.getOfferName(), name) || checkPatternLocation(offer.getLocation(), location);
    }

    private boolean checkPatternName(String offerName, String name){
        boolean retVal = false;
        if(!name.equals("")){
            Pattern patternName = Pattern.compile(name, Pattern.CASE_INSENSITIVE);
            Matcher matcher = patternName.matcher(offerName);
            retVal = matcher.find();
        }
        return retVal;
    }

    private boolean checkPatternLocation(Location offerLocation, String location){
        boolean retVal = false;
        if(!location.equals("")){
            Pattern patternName = Pattern.compile(location, Pattern.CASE_INSENSITIVE);
            Matcher matcher = patternName.matcher(offerLocation.getStreet() + offerLocation.getStreetNumber() + offerLocation.getCity() + offerLocation.getCountry());
            retVal = matcher.find();
        }
        return retVal;
    }
}