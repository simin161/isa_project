package com.fishyfinds.isa.model.beans.terms.bungalows;

import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table(name="BungalowQuickReservation")
public class BungalowQuickReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="bungalowId", referencedColumnName = "id")
    private Bungalow bungalow;

    @Column(name="startTime")
    private LocalDateTime startTime;

    @Column(name="endTime")
    private LocalDateTime endTime;

    // TODO: PreviousBungalowQuickReservation - SET/ARRAYLIST
    //  (Lista prethodnih rezervacija - cuvamo da taj isti korisnik ne moze da registruje opet istu akciju)

    // TODO: additionalServices - SET/ARRAYLIST
    //  (Price zavisi od additionalServices i unitPrice)

    @Column(name="maxNumberOfPeople")
    private int maxNumberOfPeople;

    @Column(name="price")
    private double price;

    public BungalowQuickReservation() {}

    public BungalowQuickReservation(Long id, Bungalow bungalow, LocalDateTime startTime, LocalDateTime endTime, int maxNumberOfPeople, double price) {
        this.id = id;
        this.bungalow = bungalow;
        this.startTime = startTime;
        this.endTime = endTime;
        this.maxNumberOfPeople = maxNumberOfPeople;
        this.price = price;
    }
}
