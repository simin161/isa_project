package com.fishyfinds.isa.service.offersService;

import com.fishyfinds.isa.dto.AddNewBungalowDTO;
import com.fishyfinds.isa.model.beans.offers.AdditionalService;
import com.fishyfinds.isa.model.beans.offers.ImageItem;
import com.fishyfinds.isa.model.beans.offers.Location;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.enums.OfferType;
import com.fishyfinds.isa.repository.LocationRepository;
import com.fishyfinds.isa.repository.offersRepository.BungalowRepository;
import com.fishyfinds.isa.repository.offersRepository.OfferRepository;
import com.fishyfinds.isa.repository.usersRepository.ImageItemRepository;
import com.fishyfinds.isa.repository.usersRepository.UserRepository;
import com.fishyfinds.isa.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

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
    @Autowired
    private ImageItemRepository imageItemRepository;

    public List<Bungalow> findAll(){
        return bungalowRepository.findAll();
    }
/*
    public boolean addNewBungalow(String username, Map<String, ArrayList<String>> message){
        User user = userRepository.findByEmail(username);
        Bungalow bungalow = DtoToOffer.MapToNewBungalow(message, user);
        bungalow.setOfferType(OfferType.BUNGALOW);
        locationRepository.save(bungalow.getLocation());
        bungalowRepository.save(bungalow);
        try{
            for(int i = 0; i < message.get("image").size(); ++i) {
                if (message.get("image").get(i) != null) {
                    //Long idOfTheNewImage = (long) (imageItemRepository.findAll().size() + 1);
                    ImageService.getInstance().saveImage(message.get("image").get(i), "bung" + bungalowRepository.findAll().size() + "_" + i);
                    //ImageService.getInstance().saveImage(message.get("image").get(i), ""+idOfTheNewImage);
                    //ImageItem image = new ImageItem(idOfTheNewImage, bungalow, false);
                    //imageItemRepository.save(image);
                }
            }
        }catch (Exception e){
        }
        return true;
    }*/

    public boolean addNewBungalow(AddNewBungalowDTO addNewBungalowDto, String username) {
        User user = userRepository.findByEmail(username);
        if (user == null) return false;
        Bungalow bungalow = new Bungalow();
        bungalow.setOfferType(OfferType.BUNGALOW);
        bungalow.setOfferName(addNewBungalowDto.getOfferName());
        Location location = new Location(addNewBungalowDto.getCountry(),
                addNewBungalowDto.getCity(),
                addNewBungalowDto.getStreet(),
                addNewBungalowDto.getStreetNumber());
        bungalow.setLocation(location);
        bungalow.setDescription(addNewBungalowDto.getDescription());
        bungalow.setUnitPrice(addNewBungalowDto.getUnitPrice());
        bungalow.setMaxCustomerCapacity(addNewBungalowDto.getMaxCustomerCapacity());
        bungalow.setNumberOfBeds(addNewBungalowDto.getNumberOfBeds());
        bungalow.setNumberOfRooms(addNewBungalowDto.getNumberOfRooms());
        bungalow.setRulesOfConduct(addNewBungalowDto.getRulesOfConduct());
        bungalow.setCancellationPolicy(addNewBungalowDto.getCancellationPolicy());
        bungalow.setAdditionalServices(new HashSet<AdditionalService>(addNewBungalowDto.getAdditionalServices()));
        ArrayList<ImageItem> images = new ArrayList<>();
        try {
            for (int i = 0; i < addNewBungalowDto.getImage().size(); ++i) {
                if (addNewBungalowDto.getImage().get(i) != null) {
                    String imageName = "bung" + "_"  +  (offerRepository.findAll().size()+1) + "_" + i + "_";
                    String imagePath = ImageService.getInstance().saveImage(addNewBungalowDto.getImage().get(i), imageName);
                    images.add(new ImageItem(imageName,imagePath,false));
                }
            }
        } catch (Exception e) {}
        bungalow.setImages(new HashSet<ImageItem>(images));
        System.out.println(images);
        bungalow.setUser(user);
        locationRepository.saveAndFlush(bungalow.getLocation());
        bungalowRepository.saveAndFlush(bungalow);
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
