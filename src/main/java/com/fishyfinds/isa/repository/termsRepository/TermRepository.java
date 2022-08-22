package com.fishyfinds.isa.repository.termsRepository;

import com.fishyfinds.isa.model.beans.terms.Term;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface TermRepository extends JpaRepository<Term, Long> {

    @Query(value = "SELECT * from term t, termReservation tr, reservation " +
            "r where t.id = :id and t.id = tr.term and tr.reservation = r.id and r.startDate between :startDate and :endDate or" +
            "r.endDate between :startDate and :endDate", nativeQuery = true)
    List<Term> checkIfReservationIsAvailable(@Param("id")long id, @Param("startDate")LocalDateTime startDate,
                                             @Param("endDate")LocalDateTime endDate);

    @Query(value = "SELECT * term t, termReservation tr where t.id = tr.term and tr.reservation = :reservationID", nativeQuery = true)
    Term findTermByReservation(@Param("reservationID")long id);
}
