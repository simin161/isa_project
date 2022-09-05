package com.fishyfinds.isa.dto;

import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.terms.CancelledReservation;
import com.fishyfinds.isa.model.beans.terms.Reservation;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.model.enums.ReservationStatus;
import com.fishyfinds.isa.model.enums.ReservationType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.time.LocalDateTime;

@Getter
@Setter
public class ReservationDto {
    private Long id;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private ReservationType reservationType;

    private ReservationStatus reservationStatus;

    private int numberOfPeople;

    private double totalPrice;

    private double discount;

    private boolean hasComplaint = true;

    private boolean hasFeedback = true;

    private String additionalServices;

    private int duration;

    private Customer customer;

    private Offer offer;

    public ReservationDto() { }

    public ReservationDto(Reservation reservation) {
        this.startDate = reservation.getStartDate();
        this.endDate = reservation.getEndDate();
        this.customer = reservation.getCustomer();
        this.reservationType = reservation.getReservationType();
        this.reservationStatus = reservation.getReservationStatus();
        this.numberOfPeople = reservation.getNumberOfPeople();
        this.totalPrice = reservation.getTotalPrice();
        this.offer = reservation.getOffer();
        this.duration = reservation.getDuration();
        this.discount = reservation.getDiscount();
        this.additionalServices = reservation.getAdditionalServices();
        this.hasComplaint = reservation.isHasComplaint();
        this.hasFeedback = reservation.isHasFeedback();
    }

    public ReservationDto(CancelledReservation reservation) {
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
        this.hasComplaint = reservation.isHasComplaint();
        this.hasFeedback = reservation.isHasFeedback();    }
}
