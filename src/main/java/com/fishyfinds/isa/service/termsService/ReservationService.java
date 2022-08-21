package com.fishyfinds.isa.service.termsService;

import com.fishyfinds.isa.model.beans.terms.Reservation;
import com.fishyfinds.isa.model.beans.terms.Term;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.model.enums.ReservationStatus;
import com.fishyfinds.isa.model.enums.ReservationType;
import com.fishyfinds.isa.repository.termsRepository.ReservationRepository;
import com.fishyfinds.isa.repository.termsRepository.TermRepository;
import com.fishyfinds.isa.repository.usersRepository.CustomerRepository;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private TermRepository termRepository;
    @Autowired
    private CustomerRepository customerRepository;

    /**
     * Customer side method
     * @param message - map containing values same as in TermDTO
     * @param username - customer email
     * @return - boolean value depending on result of query execution - true -> success, fase -> failure
     */
    public boolean makeReservation(Map<String, String> message, String username) {
        boolean retVal = true;
        try {
            LocalDateTime startDate = LocalDateTime.parse(message.get("startDate"));
            LocalDateTime endDate = LocalDateTime.parse(message.get("endDate"));
            if(termRepository.checkIfReservationIsAvailable(Long.parseLong(message.get("id")),startDate,endDate) == null){
                Customer customer = customerRepository.findByEmail(username);
                Reservation reservation = new Reservation();
                reservation.setReservationStatus(ReservationStatus.ACTIVE);
                reservation.setReservationType(ReservationType.DEFAULT);
                reservation.setCustomer(customer);
                reservation.setStartDate(startDate);
                reservation.setEndDate(endDate);
                reservationRepository.save(reservation);
                updateTermsReservation(Long.parseLong(message.get("id")), reservation);
            }
        }catch(Exception e){
            retVal = false;
        }
        return retVal;
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

    /*

    public boolean makeReservation(Map<String, String> message) {
        BungalowReservation bungalowReservation = new BungalowReservation();
        Bungalow bungalow = bungalowRepository.findById(Long.valueOf(message.get("offerId"))).orElse(null);
        bungalowReservation.setBungalow(bungalow);
        bungalowReservation.setCustomer(customerRepository.findByEmail(message.get("email")));
        BungalowTerm term = bungalowTermRepository.findById(Long.valueOf(message.get("termId"))).orElse(null);
        bungalowReservation.setStartTime(term.getStartTime());
        bungalowReservation.setEndTime(term.getEndTime());
        bungalowReservation.setAdditionalServices(message.get("additionalServices"));
        bungalowReservation.setReservationType(ReservationType.DEFAULT);
        bungalowReservation.setMaxNumberOfPeople(Integer.parseInt(message.get("numOfPeople")));
        double price = Integer.parseInt(message.get("numOfPeople")) * bungalow.getUnitPrice();
        bungalowReservation.setPrice(price);
        bungalowReservation.setStatusOfReservation(StatusOfReservation.ACTIVE);
        return false;
    }

    */

}
