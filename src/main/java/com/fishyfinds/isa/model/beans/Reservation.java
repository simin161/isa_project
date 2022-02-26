package com.fishyfinds.isa.model.beans;


import com.fishyfinds.isa.model.beans.users.customers.Customer;
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

    @OneToOne
    @JoinColumn(name="price", referencedColumnName = "id")
    private Price price;

    @OneToOne
    @JoinColumn(name="term", referencedColumnName = "id")
    private Term term;

    @OneToOne
    @JoinColumn(name="customer", referencedColumnName = "id")
    private Customer customer;

    @Column(name = "numberOfGuests")
    private int numberOfGuests;

    @Column(name = "reservationDiscount")
    private double reservationDiscount;

    @Column(name = "hasSupervisor")
    private boolean hasSupervisor;

}
