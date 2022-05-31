package com.fishyfinds.isa.service.termsService;

import com.fishyfinds.isa.dto.TermDto;
import com.fishyfinds.isa.model.beans.terms.boats.BoatTerm;
import com.fishyfinds.isa.model.beans.terms.bungalows.BungalowTerm;
import com.fishyfinds.isa.repository.termsRepository.BoatTermRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BoatTermService {
    @Autowired
    private BoatTermRepository boatTermRepository;
    public List<TermDto> findAll(){
        ArrayList<BoatTerm> boatTerms = (ArrayList<BoatTerm>) boatTermRepository.findAll();
        ArrayList<TermDto> dto = new ArrayList<TermDto>();
        for(BoatTerm bt: boatTerms){
            TermDto d = new TermDto(bt.getStartTime(), bt.getEndTime());
            d.offer = bt.getBoat();
            dto.add(d);
        }
        return dto;
    }
}
