package com.fishyfinds.isa.repository.termsRepository;

import com.fishyfinds.isa.model.beans.terms.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query( value = "SELECT * FROM reservation WHERE reservation_type = 1 AND customer IS NULL", nativeQuery = true)
    List<Reservation> findAllUnreservedActions();

    @Query( value = "SELECT r.*, u.*, o.*, 1 as clazz_ FROM reservation r LEFT OUTER JOIN users u on r.customer = u.id " +
            "LEFT OUTER JOIN offer o on r.offer = o.id ", nativeQuery = true)
    List<Reservation> findAllPassedReservationsForCustomer(@Param("username")String username,@Param("date") LocalDateTime date);
}
