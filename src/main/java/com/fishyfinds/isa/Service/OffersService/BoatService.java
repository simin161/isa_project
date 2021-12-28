package com.fishyfinds.isa.Service.OffersService;

import com.fishyfinds.isa.Model.beans.offers.boats.Boat;
import com.fishyfinds.isa.Repository.OffersRepository.BoatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoatService {

    @Autowired
    private BoatRepository boatRepository;

    public List<Boat> findAll(){
        return boatRepository.findAll();
    }
}
