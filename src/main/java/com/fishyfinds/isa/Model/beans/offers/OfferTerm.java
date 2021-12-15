package com.fishyfinds.isa.Model.beans.offers;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Offer_Term")
public class OfferTerm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="offerId", nullable = false, insertable = false, updatable = false)
    private int offerId;

    @Column(name="termId", nullable = false, insertable = false, updatable = false)
    private int termId;

}
