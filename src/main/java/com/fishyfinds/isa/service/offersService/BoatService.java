package com.fishyfinds.isa.service.offersService;

import com.fishyfinds.isa.model.beans.offers.boats.Boat;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.enums.OfferType;
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
}
