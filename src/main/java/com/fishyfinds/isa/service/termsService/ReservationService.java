package com.fishyfinds.isa.service.termsService;

import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.terms.CancelledReservation;
import com.fishyfinds.isa.model.beans.terms.Reservation;
import com.fishyfinds.isa.model.beans.terms.Term;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.model.enums.ReservationStatus;
import com.fishyfinds.isa.model.enums.ReservationType;
import com.fishyfinds.isa.repository.offersRepository.OfferRepository;
import com.fishyfinds.isa.repository.termsRepository.CancelledReservationRepositoty;
import com.fishyfinds.isa.repository.termsRepository.ReservationRepository;
import com.fishyfinds.isa.repository.termsRepository.TermRepository;
import com.fishyfinds.isa.repository.usersRepository.CustomerRepository;
import com.fishyfinds.isa.service.MailService;
import com.fishyfinds.isa.service.PenalService;
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
    @Autowired
    private MailService mailService;
    @Autowired
    private PenalService penalService;
    @Autowired
    private CancelledReservationRepositoty cancelledReservationRepositoty;
    @Autowired
    private CancelledReservationService cancelledReservationService;

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
            Customer customer = customerRepository.findByEmail(username);
            if(penalService.getPenalForUser(customer.getEmail()).getNumber() < 3) {
                LocalDateTime startDate = LocalDateTime.parse(message.get("startDate"));
                int duration = Integer.parseInt(message.get("duration"));
                LocalDateTime endDate = startDate.plusDays(duration);
                Term term = termRepository.findById(Long.parseLong(message.get("termId"))).orElse(null);
                if (term != null && isFree(term, startDate, endDate)) {
                    Offer offer = offerRepository.findById(Long.parseLong(message.get("offerId"))).orElse(null);
                    int numberOfPeople = Integer.parseInt(message.get("numberOfPeople"));
                    double discount = customer.getLoyaltyProgram() != null ? customer.getLoyaltyProgram().getCategoryDiscount() / 100 : 0;
                    double totalPrice = numberOfPeople * offer.getUnitPrice() - numberOfPeople * offer.getUnitPrice() * discount;
                    Reservation reservation = new Reservation(startDate, endDate, customer, ReservationStatus.ACTIVE, ReservationType.DEFAULT,
                            numberOfPeople, totalPrice, offer);
                    reservation.setDuration(duration);
                    reservation.setAdditionalServices(message.get("additionalServices"));
                    reservationRepository.save(reservation);
                    updateTermsReservation(term.getId(), reservation);
                    mailService.sendSuccessfulReservationEmail(customer, reservation);
                    retVal = true;
                }
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
        boolean retVal = false;
        Customer customer = customerRepository.findByEmail(username);
        if(penalService.getPenalForUser(customer.getEmail()).getNumber() < 3) {
            try {
                Reservation reservation = reservationRepository.findById(id).orElse(null);
                if (reservation != null) {
                    List<CancelledReservation> cR = cancelledReservationService.findAllPassedReservationsForCustomer(username);
                    if(cR.stream().filter(r -> r.getCancelledReservationId() == id).collect(Collectors.toList()).isEmpty()) {
                        reservation.setCustomer(customer);
                        reservation.setReservationStatus(ReservationStatus.ACTIVE);
                        reservationRepository.save(reservation);
                        mailService.sendSuccessfulReservationEmail(customer, reservation);
                        retVal = true;
                    }else{
                        retVal = false;
                    }
                }
            } catch (Exception e) {
                retVal = false;
            }
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
            if( reservation != null && dateTimeNow.plusDays(MAX_NUM_OF_DAYS_BEFORE_CANCELLING).isBefore(reservation.getStartDate())){
                reservation.setReservationStatus(ReservationStatus.CANCELLED);
                CancelledReservation cancelledReservation = new CancelledReservation(reservation);
                reservation.setCustomer(null);
                reservationRepository.save(reservation);
                cancelledReservationRepositoty.save(cancelledReservation);
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

    public List<Reservation> allPassedReservationsForCustomerWithoutDuplicatedOffers(String username) {
        List<Reservation> reservations = reservationRepository.findAllPassedReservationsForCustomer(username, LocalDateTime.now());
        List<Reservation> retVal = new ArrayList<>();
        if(reservations != null){
            retVal = reservations.stream().filter(r -> r.getReservationStatus() == ReservationStatus.ACTIVE && !r.isHasComplaint()).collect(Collectors.toList());
        }
        return retVal;
    }
}
