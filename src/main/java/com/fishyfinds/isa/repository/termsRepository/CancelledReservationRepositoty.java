package com.fishyfinds.isa.repository.termsRepository;

import com.fishyfinds.isa.model.beans.terms.CancelledReservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CancelledReservationRepositoty extends JpaRepository<CancelledReservation, Long> {
}
