package com.fishyfinds.isa.service.termsService;

import com.fishyfinds.isa.repository.termsRepository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    // TODO: makeReservation - Bungalow, Boat (w/o captain), Course
    public boolean makeReservation(Map<String, String> message) {
        return false;
    }

    // TODO: makeReservationWithCaptain - Boat (with captain)
    public boolean makeReservationWithCaptain(Map<String, String> message) {
        return false;
    }

}
