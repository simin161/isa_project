package com.fishyfinds.isa.model.beans.offers;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Offer_Feedback")
public class OfferFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="offerId", nullable = false, insertable = false, updatable = false)
    private int offerId;

    @Column(name="feedbackId", nullable = false, insertable = false, updatable = false)
    private int feedbackId;

}
