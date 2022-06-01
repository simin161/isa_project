package com.fishyfinds.isa.model.beans.terms.boats;

import com.fishyfinds.isa.model.beans.offers.boats.Boat;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.model.enums.ReservationType;
import com.fishyfinds.isa.model.enums.StatusOfReservation;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name="BoatReservation")
public class BoatReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer", referencedColumnName = "id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "boat", referencedColumnName = "id")
    private Boat boat;

    @Column(name="startTime", nullable = false)
    private LocalDateTime startTime;

    @Column(name="endTime", nullable = false)
    private LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    @Column(name="statusOfReservation", nullable = false)
    private StatusOfReservation statusOfReservation;

    @Enumerated(EnumType.STRING)
    @Column(name="reservationType")
    private ReservationType reservationType;

    @Column(name="additionalServices")
    private String additionalServices; //can't be changed => doesn't have to be object
    @Column(name="price", nullable = false)
    private double price;

    @Column(name="maxNumberOfPeople")
    private int maxNumberOfPeople;

    public BoatReservation() { }

    public BoatReservation(Long id,
                           Customer customer,
                           Boat boat,
                           LocalDateTime startTime,
                           LocalDateTime endTime,
                           StatusOfReservation statusOfReservation,
                           ReservationType reservationType) {
        this.id = id;
        this.customer = customer;
        this.boat = boat;
        this.startTime = startTime;
        this.endTime = endTime;
        this.statusOfReservation = statusOfReservation;
        this.reservationType = reservationType;
    }



}
