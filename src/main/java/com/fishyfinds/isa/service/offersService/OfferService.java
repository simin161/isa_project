package com.fishyfinds.isa.service.offersService;

import com.fishyfinds.isa.model.beans.offers.Location;
import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.repository.offersRepository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class OfferService {

    @Autowired
    private  OfferRepository offerRepository;

    public  boolean checkPatternOffer(Long id, String name, String location){
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
