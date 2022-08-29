package com.fishyfinds.isa.service.termsService;

import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.terms.Reservation;
import com.fishyfinds.isa.model.beans.terms.Term;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.model.enums.ReservationStatus;
import com.fishyfinds.isa.model.enums.ReservationType;
import com.fishyfinds.isa.repository.offersRepository.OfferRepository;
import com.fishyfinds.isa.repository.termsRepository.ReservationRepository;
import com.fishyfinds.isa.repository.termsRepository.TermRepository;
import com.fishyfinds.isa.repository.usersRepository.CustomerRepository;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private TermRepository termRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private OfferRepository offerRepository;

    private final int MAX_NUM_OF_DAYS_BEFORE_CANCELLING = 3;
    /**
     * Customer side method
     * @param message - map containing values same as in TermDTO
     * @param username - customer email
     * @return - boolean value depending on result of query execution - true -> success, fase -> failure
     */
    public boolean makeReservation(Map<String, String> message, String username) {
        boolean retVal = false;
        try {
            LocalDateTime startDate = LocalDateTime.parse(message.get("startDate"));
            LocalDateTime endDate = LocalDateTime.parse(message.get("endDate"));
            Term term = termRepository.findById(Long.parseLong(message.get("termId"))).orElse(null);
            if(term != null && isFree(term, startDate, endDate)){
                Customer customer = customerRepository.findByEmail(username);
                Reservation reservation = new Reservation();
                reservation.setReservationStatus(ReservationStatus.ACTIVE);
                reservation.setReservationType(ReservationType.DEFAULT);
                reservation.setCustomer(customer);
                reservation.setStartDate(startDate);
                reservation.setEndDate(endDate);
                reservation.setNumberOfPeople(Integer.parseInt(message.get("numberOfPeople")));
                Offer offer = offerRepository.findById(Long.parseLong(message.get("offerId"))).orElse(null);
                reservation.setTotalPrice(offer.getUnitPrice()* reservation.getNumberOfPeople()); //TODO: add discount
                reservationRepository.save(reservation);
                updateTermsReservation(term.getId(), reservation);
                retVal = true;
            }
        }catch(Exception e){
            e.printStackTrace();
            retVal = false;
        }
        return retVal;
    }

    private boolean isFree(Term term, LocalDateTime startDate, LocalDateTime endDate){
        boolean retVal = true;
        List<Reservation> reservations = term.getReservations();
        boolean isInValidTermRange = startDate.isAfter(term.getStartDate()) && startDate.isBefore(term.getEndDate()) &&
                endDate.isBefore(term.getEndDate()) && endDate.isAfter(term.getStartDate());

        if(!isInValidTermRange)
            return false;

        boolean hasReservationInTermRange = false;
        for(Reservation r : reservations){
            if((startDate.isAfter(r.getStartDate()) || startDate.isEqual(r.getStartDate())) && (startDate.isBefore(r.getEndDate()) || startDate.isEqual(r.getEndDate())) &&
                    (endDate.isBefore(r.getEndDate()) || endDate.isEqual(r.getEndDate())) && (endDate.isAfter(r.getStartDate()) || endDate.isEqual(r.getStartDate()))){
                hasReservationInTermRange = true;
                break;
            }
        }

        return isInValidTermRange && !hasReservationInTermRange;
    }

    /**
     * Customer side method
     * @param id - reservation id
     * @param username - customer email
     * @return - boolean value depending on result of query execution - true -> success, fase -> failure
     */
    public boolean makeReservationAction(Long id, String username){
        boolean retVal = true;
        try{
            Reservation reservation = reservationRepository.findById(id).orElse(null);
            if(reservation != null){
                reservation.setCustomer(customerRepository.findByEmail(username));
                reservationRepository.save(reservation);
            }
        }catch(Exception e){
            retVal = false;
        }
        return retVal;
    }

    private void updateTermsReservation(Long termId, Reservation reservation){
        Term term = termRepository.findById(termId).orElse(null);
        if(term != null){
            term.getReservations().add(reservation);
            termRepository.save(term);
        }
    }

    public boolean cancelReservation(Long id) {
        boolean retVal = true;
        try{
            Reservation reservation = reservationRepository.findById(id).orElse(null);
            LocalDateTime dateTimeNow = LocalDateTime.now();
            if(dateTimeNow.plusDays(MAX_NUM_OF_DAYS_BEFORE_CANCELLING).isBefore(reservation.getStartDate())){
                reservation.setReservationStatus(ReservationStatus.CANCELLED);
                reservationRepository.save(reservation);
            }else{
                retVal = false;
            }

        }catch(Exception e){
            retVal = false;
        }

        return retVal;
    }

    public List<Reservation> historyOfReservationsForCustomer(String username){
        List<Reservation> reservations = reservationRepository.findAllPassedReservationsForCustomer(username, LocalDateTime.now());
        return reservations != null ? reservations : new ArrayList<>();
    }

    public List<Reservation> upcomingReservationsForCustomer(String username) {
        return reservationRepository.findAllUpcomingReservationsForUser(username, LocalDateTime.now());
    }

    public List<Reservation> getActionsForOffer(Long id) {
        List<Reservation> allActions = reservationRepository.findAllActionsForOffer(id, LocalDateTime.now());
        if(allActions != null){
            allActions = allActions.stream().filter(a ->{
                return a.getReservationType() == ReservationType.QUICK && (a.getReservationStatus() == ReservationStatus.CANCELLED
                        || (a.getReservationStatus() == ReservationStatus.ACTIVE && a.getCustomer() == null));
            }).collect(Collectors.toList());
        }
        return allActions;
    }
}
