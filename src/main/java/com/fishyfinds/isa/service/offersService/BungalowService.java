package com.fishyfinds.isa.service.offersService;

import com.fishyfinds.isa.mappers.DtoToOffer;
import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.enums.OfferType;
import com.fishyfinds.isa.model.enums.UserType;
import com.fishyfinds.isa.repository.LocationRepository;
import com.fishyfinds.isa.repository.offersRepository.BungalowRepository;
import com.fishyfinds.isa.repository.offersRepository.OfferRepository;
import com.fishyfinds.isa.repository.usersRepository.UserRepository;
import com.fishyfinds.isa.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

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
    private OfferRepository offerRepository;
    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Bungalow> findAll(){
        return bungalowRepository.findAll();
    }



    public boolean addNewBungalow(String username, Map<String, String> message){
        User user = userRepository.findByEmail(username);
        Bungalow bungalow = DtoToOffer.MapToNewBungalow(message, user);
        try{
            ImageService.getInstance().saveImage(message.get("image"), "test");
        }catch (Exception e){
            e.printStackTrace();
        }
        bungalow.setOfferType(OfferType.BUNGALOW);
        locationRepository.save(bungalow.getLocation());
        bungalowRepository.save(bungalow);
        return true;
    }

    public List<Bungalow> findAllByOwnerId(Long loggedUserId) {
        List<Bungalow> myBungalows = new ArrayList<Bungalow>();
        for(Bungalow bungalow : bungalowRepository.findAll()){
            if(bungalow.getUser().getId().equals(loggedUserId)){
                myBungalows.add(bungalow);
            }
        }
        return myBungalows;
    }
}
