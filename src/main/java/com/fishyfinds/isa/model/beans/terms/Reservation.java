package com.fishyfinds.isa.model.beans.terms;


import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.model.enums.ReservationStatus;
import com.fishyfinds.isa.model.enums.ReservationType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "Reservation")
@SequenceGenerator(name = "sequence", sequenceName = "mySequence")
public class Reservation {

    @Id
    @GenericGenerator(name = "seq", strategy="increment")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seq")
    private Long id;

    @Column(name = "startDate")
    private LocalDateTime startDate;

    @Column(name = "endDate")
    private LocalDateTime endDate;

    @Column(name = "reservationType")
    private ReservationType reservationType;

    @Column(name="reservationStatus")
    private ReservationStatus reservationStatus;

    @Column(name="numberOfPeople")
    private int numberOfPeople;

    @Column(name="totalPrice")
    private double totalPrice;

    @Column(name="discount")
    private double discount;

    @OneToOne
    @JoinColumn(name="customer", referencedColumnName = "id")
    private Customer customer;

    @OneToOne
    @JoinColumn(name="offer", referencedColumnName = "id")
    private Offer offer;
    public Reservation() { }

    public Reservation(LocalDateTime startDate, LocalDateTime endDate, Customer customer, ReservationStatus reservationStatus, ReservationType reservationType, int numberOfPeople, double totalPrice, Offer offer) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.customer = customer;
        this.reservationType = reservationType;
        this.reservationStatus = reservationStatus;
        this.numberOfPeople = numberOfPeople;
        this.totalPrice = totalPrice;
        this.offer = offer;
    }
}
