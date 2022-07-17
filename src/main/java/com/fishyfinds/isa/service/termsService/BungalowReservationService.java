package com.fishyfinds.isa.service.termsService;

import com.fishyfinds.isa.repository.offersRepository.BungalowRepository;
import com.fishyfinds.isa.repository.usersRepository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BungalowReservationService {


    @Autowired
    private BungalowRepository bungalowRepository;
    @Autowired
    private CustomerRepository customerRepository;


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
