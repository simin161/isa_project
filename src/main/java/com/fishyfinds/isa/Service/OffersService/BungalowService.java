package com.fishyfinds.isa.Service.OffersService;

import com.fishyfinds.isa.Model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.Repository.OffersRepository.BungalowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BungalowService {

    @Autowired
    private BungalowRepository bungalowRepository;

    public List<Bungalow> findAll(){
        return bungalowRepository.findAll();
    }
}
