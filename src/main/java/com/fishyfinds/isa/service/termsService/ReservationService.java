package com.fishyfinds.isa.service.termsService;

import com.fishyfinds.isa.repository.termsRepository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    // TODO: makeReservation - Bungalow, Boat (w/o captain), Course (pogledati kommentb blok dole)
    public boolean makeReservation(Map<String, String> message) {
        return false;
    }

    // TODO: makeReservationWithCaptain - Boat (with captain)
    public boolean makeReservationWithCaptain(Map<String, String> message) {
        return false;
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
