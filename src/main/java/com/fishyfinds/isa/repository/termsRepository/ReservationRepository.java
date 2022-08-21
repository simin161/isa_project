package com.fishyfinds.isa.repository.termsRepository;

import com.fishyfinds.isa.model.beans.terms.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query( value = "SELECT * FROM reservation WHERE reservationType = 1 AND customer IS NULL", nativeQuery = true)
    List<Reservation> findAllUnreservedActions();
}
