package com.fishyfinds.isa.model.beans.terms;


import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.model.enums.ReservationStatus;
import com.fishyfinds.isa.model.enums.ReservationType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "Reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "startDate")
    private LocalDateTime startDate;

    @Column(name = "endDate")
    private LocalDateTime endDate;

    @Column(name = "reservationType")
    private ReservationType reservationType;

    @Column(name="reservationStatus")
    private ReservationStatus reservationStatus;

    @OneToOne
    @JoinColumn(name="customer", referencedColumnName = "id")
    private Customer customer;


    public Reservation() { }

    public Reservation(LocalDateTime startDate, LocalDateTime endDate, Customer customer, ReservationStatus reservationStatus) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.customer = customer;
        this.reservationStatus = reservationStatus;
    }
}
