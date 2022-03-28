package com.fishyfinds.isa.model.beans.offers;

import com.fishyfinds.isa.model.beans.Term;
import com.fishyfinds.isa.model.beans.UserFeedback;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.enums.OfferType;
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
    protected Long id;

    @Column(name = "offerType", nullable = false)
    protected OfferType offerType;

    @Column(name = "offerName", nullable = false)
    protected String offerName;

    @OneToOne
    @JoinColumn(name="users", referencedColumnName = "id")
    protected User user;

    @OneToOne
    @JoinColumn(name="location", referencedColumnName = "id")
    protected Location location;

    @Column(name = "description", nullable = false)
    protected String description;

    @Column(name = "unitPrice", nullable = false)
    protected double unitPrice;

    @Column(name = "rating", nullable = false)
    protected double rating;

    @OneToMany(mappedBy="id", fetch = FetchType.EAGER)
    protected Set<Term> terms;

    @OneToMany(mappedBy="id", fetch = FetchType.EAGER)
    protected Set<Image> images;

    @Column(name = "maxCustomerCapacity", nullable = false)
    protected int maxCustomerCapacity;

    @Column(name = "rulesOfConduct", nullable = false)
    protected String rulesOfConduct;

    @Column(name = "additionalServices", nullable = false)
    protected String additionalServices;

    @Column(name = "cancellationPolicy", nullable = false)
    protected String cancellationPolicy;

   /* @OneToMany(mappedBy="id", fetch = FetchType.EAGER)
    protected Set<UserFeedback> reviews;*/


}
