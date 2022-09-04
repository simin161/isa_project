package com.fishyfinds.isa.service.termsService;

import com.fishyfinds.isa.model.beans.terms.CancelledReservation;
import com.fishyfinds.isa.repository.termsRepository.CancelledReservationRepositoty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CancelledReservationService {

    @Autowired
    private CancelledReservationRepositoty cancelledReservationRepositoty;

    public List<CancelledReservation> findAllPassedReservationsForCustomer(String username){
        List<CancelledReservation> retVal = cancelledReservationRepositoty.findAll();
        return retVal.stream().filter(r -> r.getCustomer().getEmail().equals(username)).collect(Collectors.toList());
    }
}
