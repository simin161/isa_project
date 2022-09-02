package com.fishyfinds.isa.model.beans;

import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.terms.Reservation;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.model.enums.ComplaintStatus;
import com.fishyfinds.isa.model.enums.TargetType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "UserFeedback")
@SequenceGenerator(name = "sequence", sequenceName = "mySequence")
public class UserFeedback {

    @Id
    @GenericGenerator(name = "seq", strategy="increment")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seq")
    private int id;

    @Column(name = "contentForOwner")
    private String contentForOwner;

    @Column(name = "contentForOffer")
    private String contentForOffer;

    @OneToOne
    @JoinColumn(name="reservation", referencedColumnName = "id")
    private Reservation reservation;

    @Column(name = "rateOwner")
    private int rateOwner;

    @Column(name = "rateOffer")
    private int rateOffer;

    @Column(name = "status")
    private ComplaintStatus status;

}
