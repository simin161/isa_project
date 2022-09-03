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
import java.util.stream.Collectors;

@Service
public class TermService {

    @Autowired
    private TermRepository termRepository;

    public List<TermDTO> filterAvailableTerms(LocalDateTime startDateFilter, LocalDateTime endDateFilter, String offerTypeFilter, int numberOfPeople) {
        System.out.println("TermService - filterAvailableTerms()");
        // parameters
        // arrays
        List<TermDTO> allTermDTOs = findAllTermDTOs();
        List<TermDTO> filteredTermDTOs = new ArrayList<>();
        // business logic
        for (TermDTO termDTO : allTermDTOs) {
            if (offerTypeFilter.equals(termDTO.offer.getOfferType().toString())
                    && (startDateFilter.isAfter(termDTO.startTime) || startDateFilter.isEqual(termDTO.startTime)) && !startDateFilter.isAfter(termDTO.endTime)
                    && (endDateFilter.isBefore(termDTO.endTime) || endDateFilter.isEqual(termDTO.endTime)) && !endDateFilter.isBefore(termDTO.startTime)) {
                filteredTermDTOs.add(termDTO);
            }
        }
        return filteredTermDTOs.stream().filter(t -> t.getOffer().getMaxCustomerCapacity() >= numberOfPeople).collect(Collectors.toList());
    }
    public List<TermDTO> filterAvailableTerms(LocalDateTime startDateFilter, LocalDateTime endDateFilter, String offerTypeFilter) {
        System.out.println("TermService - filterAvailableTerms()");
        // parameters
        // arrays
        List<TermDTO> allTermDTOs = findAllTermDTOs();
        List<TermDTO> filteredTermDTOs = new ArrayList<>();
        // business logic
        for (TermDTO termDTO : allTermDTOs) {
            if (offerTypeFilter.equals(termDTO.offer.getOfferType().toString())
                    && (startDateFilter.isAfter(termDTO.startTime) || startDateFilter.isEqual(termDTO.startTime)) && !startDateFilter.isAfter(termDTO.endTime)
                    && (endDateFilter.isBefore(termDTO.endTime) || endDateFilter.isEqual(termDTO.endTime)) && !endDateFilter.isBefore(termDTO.startTime)) {
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
        LocalDateTime today = LocalDateTime.now();
        for (TermDTO termDTO : allTermDTOs) {
            if (termDTO.getOffer().getId().equals(offerId)) {
                if((today.isAfter(termDTO.startTime) || today.isEqual(termDTO.startTime)) &&
                    today.isBefore(termDTO.endTime))
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
