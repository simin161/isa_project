package com.fishyfinds.isa.model.beans.terms.boats;

import com.fishyfinds.isa.model.beans.offers.boats.Boat;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
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
    @JoinColumn(name = "customerId", referencedColumnName = "id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "boatId", referencedColumnName = "id")
    private Boat boat;

    @Column(name="startTime", nullable = false)
    private LocalDateTime startTime;

    @Column(name="endTime", nullable = false)
    private LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    @Column(name="statusOfReservation", nullable = false)
    private StatusOfReservation statusOfReservation;

    // TODO: additionalServices, navigationalTools, fishingTools
    //  (price zavisi od additionalServices i unitPrice)

    @Column(name="price", nullable = false)
    private double price;

    public BoatReservation() { }

    public BoatReservation(Long id, Customer customer, Boat boat, LocalDateTime startTime, LocalDateTime endTime, StatusOfReservation statusOfReservation, double price) {
        this.id = id;
        this.customer = customer;
        this.boat = boat;
        this.startTime = startTime;
        this.endTime = endTime;
        this.statusOfReservation = statusOfReservation;
        this.price = price;
    }



}
