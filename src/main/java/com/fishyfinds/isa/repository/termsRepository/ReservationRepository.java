package com.fishyfinds.isa.repository.termsRepository;

import com.fishyfinds.isa.model.beans.terms.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

}
