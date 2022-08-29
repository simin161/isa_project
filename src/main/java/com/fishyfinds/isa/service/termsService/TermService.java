package com.fishyfinds.isa.service.termsService;

import com.fishyfinds.isa.dto.TermDTO;
import com.fishyfinds.isa.mappers.DtoToTerm;
import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.terms.Term;
import com.fishyfinds.isa.repository.termsRepository.TermRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class TermService {

    @Autowired
    private TermRepository termRepository;

    public List<TermDTO> filterAvailableTerms(Map<String, String> message) {
        System.out.println("TermService - filterAvailableTerms()");
        // parameters
        String offerTypeFilter = message.get("offerType");
        LocalDateTime startDateFilter = LocalDateTime.parse(message.get("start"), DateTimeFormatter.ISO_DATE_TIME);
        LocalDateTime endDateTimeFilter = LocalDateTime.parse(message.get("end"), DateTimeFormatter.ISO_DATE_TIME);
        // arrays
        List<TermDTO> allTermDTOs = findAllTermDTOs();
        List<TermDTO> filteredTermDTOs = new ArrayList<>();
        // business logic
        for (TermDTO termDTO : allTermDTOs) {
            if (offerTypeFilter.equals(termDTO.offer.getOfferType().toString())
                    && (startDateFilter.isBefore(termDTO.startTime) || startDateFilter.isEqual(termDTO.startTime)) && !startDateFilter.isAfter(termDTO.endTime)
                    && (endDateTimeFilter.isAfter(termDTO.endTime) || endDateTimeFilter.isEqual(termDTO.endTime)) && !endDateTimeFilter.isBefore(termDTO.startTime)) {
                filteredTermDTOs.add(termDTO);
            }
        }
        return filteredTermDTOs;
    }

    public List<TermDTO> getTermsByOfferId(Long offerId){
        System.out.println("TermService - getTermsByOfferId(Long offerId)");
        // arrays
        List<TermDTO> allTermDTOs = findAllTermDTOs();
        List<TermDTO> offerTermDTOs = new ArrayList<>();
        // business logic
        for (TermDTO termDTO : allTermDTOs) {
            if (termDTO.getOffer().getId().equals(offerId)) {
                offerTermDTOs.add(termDTO);
            }
        }
        return offerTermDTOs;
    }

    public boolean addNewTermToOffer(TermDTO termDTO, Offer offer){
        Term term = DtoToTerm.MapToTerm(termDTO, offer);
        termRepository.save(term);
        return true;
    }

    public List<TermDTO> findAllTermDTOs() {
        ArrayList<Term> allTerms = (ArrayList<Term>) termRepository.findAll();
        ArrayList<TermDTO> allTermDTOS = new ArrayList<TermDTO>();
        for (Term term : allTerms) {
            TermDTO termDTO = new TermDTO();
            termDTO.setId(term.getId());
            termDTO.setOffer(term.getOffer());
            termDTO.setStartTime(term.getStartDate());
            termDTO.setEndTime(term.getEndDate());
            // TODO: Da li treba poslati i rezervacije u ovom slucaju?
            // termDto.setReservations(term.getReservations());
            allTermDTOS.add(termDTO);
        }
        return allTermDTOS;
    }


    public Term getTermById(Long id) {
        return termRepository.findById(id).orElse(null);
    }
}
