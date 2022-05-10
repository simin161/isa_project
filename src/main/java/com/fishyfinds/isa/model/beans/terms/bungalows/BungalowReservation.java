package com.fishyfinds.isa.model.beans.terms.bungalows;

import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
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

    // TODO: additionalServices (price zavisi od additionalServices i unitPrice)

    @Column(name="price", nullable = false)
    private double price;

    public BungalowReservation() { }

    public BungalowReservation(Long id, Customer customer, Bungalow bungalow, LocalDateTime startTime, LocalDateTime endTime, StatusOfReservation statusOfReservation, double price) {
        this.id = id;
        this.customer = customer;
        this.bungalow = bungalow;
        this.startTime = startTime;
        this.endTime = endTime;
        this.statusOfReservation = statusOfReservation;
        this.price = price;
    }
}
