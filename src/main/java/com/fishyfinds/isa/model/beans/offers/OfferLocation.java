package com.fishyfinds.isa.model.beans.offers;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Offer_Location")
public class OfferLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="offerId", nullable = false, insertable = false, updatable = false)
    private int offerId;

    @Column(name="locationId", nullable = false, insertable = false, updatable = false)
    private int locationId;

}
