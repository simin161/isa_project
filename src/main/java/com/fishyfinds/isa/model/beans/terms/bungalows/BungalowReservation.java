package com.fishyfinds.isa.model.beans.terms.bungalows;

import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.model.enums.ReservationType;
import com.fishyfinds.isa.model.enums.StatusOfReservation;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table(name="BungalowReservation")
public class BungalowReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customerId", referencedColumnName = "id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bungalowId", referencedColumnName = "id")
    private Bungalow bungalow;

    @Column(name="startTime", nullable = false)
    private LocalDateTime startTime;

    @Column(name="endTime", nullable = false)
    private LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    @Column(name="statusOfReservation", nullable = false)
    private StatusOfReservation statusOfReservation;

    @Enumerated(EnumType.STRING)
    @Column(name="reservationType", nullable = false)
    private ReservationType reservationType;

    @Column(name="additionalServices")
    private String additionalServices;

    @Column(name="price", nullable = false)
    private double price;

    @Column(name="maxNumberOfPeople")
    private int maxNumberOfPeople;


    public BungalowReservation() { }

    public BungalowReservation(Long id,
                               Customer customer,
                               Bungalow bungalow,
                               LocalDateTime startTime,
                               LocalDateTime endTime,
                               StatusOfReservation statusOfReservation,
                               ReservationType reservationType,
                               double price) {
        this.id = id;
        this.customer = customer;
        this.bungalow = bungalow;
        this.startTime = startTime;
        this.endTime = endTime;
        this.statusOfReservation = statusOfReservation;
        this.reservationType = reservationType;
        this.price = price;
    }
}
