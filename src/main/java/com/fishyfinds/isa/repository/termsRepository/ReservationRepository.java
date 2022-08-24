package com.fishyfinds.isa.repository.termsRepository;

import com.fishyfinds.isa.model.beans.terms.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query( value = "SELECT * FROM reservation WHERE reservationType = 1 AND customer IS NULL", nativeQuery = true)
    List<Reservation> findAllUnreservedActions();

    @Query( value = "SELECT * FROM reservation r, users u WHERE r.customer = u.id AND u.email = :username and reservation.endDate <= :date", nativeQuery = true)
    List<Reservation> findAllPassedReservationsForCustomer(@Param("username")String username,@Param("date") LocalDateTime date);
}
