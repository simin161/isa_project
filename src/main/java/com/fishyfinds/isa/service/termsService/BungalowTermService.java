package com.fishyfinds.isa.service.termsService;

import com.fishyfinds.isa.dto.TermDto;
import com.fishyfinds.isa.mappers.DtoToOffer;
import com.fishyfinds.isa.mappers.DtoToTerm;
import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.beans.terms.bungalows.BungalowTerm;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.repository.LocationRepository;
import com.fishyfinds.isa.repository.offersRepository.BungalowRepository;
import com.fishyfinds.isa.repository.offersRepository.OfferRepository;
import com.fishyfinds.isa.repository.termsRepository.BungalowTermRepository;
import com.fishyfinds.isa.repository.usersRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BungalowTermService {

    @Autowired
    private BungalowTermRepository bungalowTermRepository;
    @Autowired
    private BungalowRepository bungalowRepository;
    @Autowired
    private OfferRepository offerRepository;
    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private UserRepository userRepository;


    public List<TermDto> findAll(){
        ArrayList<BungalowTerm> bungalowTerms = (ArrayList<BungalowTerm>) bungalowTermRepository.findAll();
        ArrayList<TermDto> dto = new ArrayList<TermDto>();
        for(BungalowTerm bt: bungalowTerms){
            TermDto d = new TermDto(bt.getStartTime(), bt.getEndTime());
            d.id = bt.getId();
            dto.add(d);
        }
        return dto;
    }

    public List<TermDto> findAllByBungalowId(Long bungalowId){
        ArrayList<BungalowTerm> bungalowTerms = (ArrayList<BungalowTerm>) bungalowTermRepository.findAll();
        ArrayList<TermDto> dto = new ArrayList<TermDto>();
        for(BungalowTerm bt: bungalowTerms){
            if (bt.getBungalow().getId().equals(bungalowId)){
                dto.add(new TermDto(bt.getStartTime(), bt.getEndTime()));
            }
        }
        return dto;
    }

    public boolean addNewTimeSlotToBungalow(Bungalow bungalow, TermDto termDto){
        BungalowTerm bungalowTerm = DtoToTerm.MapToTerm(termDto,bungalow);
        bungalowTermRepository.save(bungalowTerm);
        return true;
    }




}
