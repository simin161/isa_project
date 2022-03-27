package com.fishyfinds.isa.model.beans;

import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.model.enums.ComplaintStatus;
import com.fishyfinds.isa.model.enums.TargetType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "UserFeedback")
public class UserFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "content")
    private String content;

    @OneToOne
    @JoinColumn(name="customer", referencedColumnName = "id")
    private Customer customer;

    @OneToOne
    @JoinColumn(name="offer", referencedColumnName = "id")
    private Offer offer;

    @Column(name = "rate")
    private int rate;

    @Column(name = "status")
    private ComplaintStatus status;

}
