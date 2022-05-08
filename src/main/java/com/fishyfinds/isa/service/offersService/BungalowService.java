package com.fishyfinds.isa.service.offersService;

import com.fishyfinds.isa.mappers.DtoToOffer;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.enums.OfferType;
import com.fishyfinds.isa.repository.LocationRepository;
import com.fishyfinds.isa.repository.offersRepository.BungalowRepository;
import com.fishyfinds.isa.repository.offersRepository.OfferRepository;
import com.fishyfinds.isa.repository.usersRepository.UserRepository;
import com.fishyfinds.isa.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    public boolean addNewBungalow(String username, Map<String, ArrayList<String>> message){
        User user = userRepository.findByEmail(username);
        Bungalow bungalow = DtoToOffer.MapToNewBungalow(message, user);
        try{
            for(int i = 0; i < message.get("image").size(); ++i) {
                if(message.get("image").get(i) != null)
                    ImageService.getInstance().saveImage(message.get("image").get(i), "bung" + bungalowRepository.findAll().size() + "_" + i);
            }
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

    public Bungalow findByBungalowId(Long bungalowId){
        for(Bungalow bungalow : bungalowRepository.findAll()){
            if(bungalow.getId().equals(bungalowId)){
                return bungalow;
            }
        }
        return null;
    }
}
