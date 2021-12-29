package com.fishyfinds.isa.service.offersService;

import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.repository.offersRepository.BungalowRepository;
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
