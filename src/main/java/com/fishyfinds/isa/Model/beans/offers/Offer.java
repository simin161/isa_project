package com.fishyfinds.isa.Model.beans.offers;

import com.fishyfinds.isa.Model.beans.Term;
import com.fishyfinds.isa.Model.beans.UserFeedback;
import com.fishyfinds.isa.Model.enums.OfferType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
@Entity
@Table(name = "Offer")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int id;

    @Column(name = "offerType", nullable = false)
    protected OfferType offerType;

    @Column(name = "offerName", nullable = false)
    protected String offerName;

    @Column(name = "userID", nullable = false)
    protected int userID;


    //protected List<Image> images;


    @OneToOne
    @JoinColumn(name="location", referencedColumnName = "id")
    protected Location location;

    @Column(name = "description", nullable = false)
    protected String description;

    @Column(name = "unitPrice", nullable = false)
    protected double unitPrice;

    @Column(name = "rating", nullable = false)
    protected double rating;

    @OneToMany
    @JoinColumn(name="id")
    protected Set<Term> terms;

    @Column(name = "maxCustomerCapacity", nullable = false)
    protected int maxCustomerCapacity;

    @Column(name = "rulesOfConduct", nullable = false)
    protected String rulesOfConduct;

    @Column(name = "additionalServices", nullable = false)
    protected String additionalServices;

    @Column(name = "cancellationPolicy", nullable = false)
    protected String cancellationPolicy;

    @OneToMany
    @JoinColumn(name="id")
    protected Set<UserFeedback> reviews;


}
