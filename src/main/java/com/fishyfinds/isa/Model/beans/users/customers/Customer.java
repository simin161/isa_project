package com.fishyfinds.isa.Model.beans.users.customers;

import com.fishyfinds.isa.Model.beans.LoyaltyProgram;
import com.fishyfinds.isa.Model.beans.users.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
@Table(name = "Customer")
@PrimaryKeyJoinColumn(name = "id")
public class Customer extends User {

    @Column(name = "country", nullable = false)
    private String country;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "phoneNumber", nullable = false)
    private String phoneNumber;

    @Column(name = "numberOfPenalty", nullable = false)
    private int numberOfPenalty;

    @OneToOne
    @JoinColumn(name="loyaltyProgram", referencedColumnName = "id")
    private LoyaltyProgram loyaltyProgram;
}