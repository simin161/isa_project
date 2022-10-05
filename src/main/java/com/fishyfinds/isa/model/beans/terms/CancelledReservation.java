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
@Table(name = "CancelledReservation")
@SequenceGenerator(name = "sequence", sequenceName = "mySequence")
public class CancelledReservation {
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

    @Column(name="hasComplaint")
    private boolean hasComplaint = true;

    @Column(name="hasFeedback")
    private boolean hasFeedback = true;

    @Column(name="additionalServices")
    private String additionalServices;

    @Column(name="duration")
    private int duration;

    @Column(name="cancelledReservation")
    private Long cancelledReservationId;

    @OneToOne
    @JoinColumn(name="customer", referencedColumnName = "id")
    private Customer customer;

    @OneToOne
    @JoinColumn(name="offer", referencedColumnName = "id")
    private Offer offer;

    public CancelledReservation() { }

    public CancelledReservation(Reservation reservation) {
        this.startDate = reservation.getStartDate();
        this.endDate = reservation.getEndDate();
        this.customer = reservation.getCustomer();
        this.reservationType = reservation.getReservationType();
        this.reservationStatus = ReservationStatus.CANCELLED;
        this.numberOfPeople = reservation.getNumberOfPeople();
        this.totalPrice = reservation.getTotalPrice();
        this.offer = reservation.getOffer();
        this.duration = reservation.getDuration();
        this.discount = reservation.getDiscount();
        this.additionalServices = reservation.getAdditionalServices();
        this.cancelledReservationId = reservation.getId();
    }
}
