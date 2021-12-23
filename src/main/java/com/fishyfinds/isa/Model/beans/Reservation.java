package com.fishyfinds.isa.Model.beans;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "priceId")
    private int priceId;

    @Column(name = "termId")
    private int termId;

    @Column(name = "customerId")
    private int customerId;

    @Column(name = "numberOfGuests")
    private int numberOfGuests;

    @Column(name = "reservationDiscount")
    private double reservationDiscount;

    @Column(name = "hasSupervisor")
    private boolean hasSupervisor;

}
