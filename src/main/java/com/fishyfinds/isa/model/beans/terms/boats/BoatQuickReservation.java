package com.fishyfinds.isa.model.beans.terms.boats;

import com.fishyfinds.isa.model.beans.offers.boats.Boat;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table(name="BoatQuickReservation")
public class BoatQuickReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="boatId", referencedColumnName = "id")
    private Boat boat;

    @Column(name="startTime")
    private LocalDateTime startTime;

    @Column(name="endTime")
    private LocalDateTime endTime;

    // TODO: PreviousBoatQuickReservation - SET/ARRAYLIST
    //  (Lista prethodnih rezervacija - cuvamo da taj isti korisnik ne moze da registruje opet istu akciju)

    // TODO: additionalServices, navigationalTools, fishingTools - SET/ARRAYLIST
    //  (Price zavisi od additionalServices i unitPrice)

    @Column(name="maxNumberOfPeople")
    private int maxNumberOfPeople;

    @Column(name="price")
    private double price;

    public BoatQuickReservation() {}

    public BoatQuickReservation(Long id, Boat boat, LocalDateTime startTime, LocalDateTime endTime, int maxNumberOfPeople, double price) {
        this.id = id;
        this.boat = boat;
        this.startTime = startTime;
        this.endTime = endTime;
        this.maxNumberOfPeople = maxNumberOfPeople;
        this.price = price;
    }

}
