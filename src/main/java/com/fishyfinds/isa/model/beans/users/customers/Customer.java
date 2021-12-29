package com.fishyfinds.isa.model.beans.users.customers;

import com.fishyfinds.isa.model.beans.LoyaltyProgram;
import com.fishyfinds.isa.model.beans.users.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
@Table(name = "Customer")
@PrimaryKeyJoinColumn(name = "id")
public class Customer extends User {

    @Column(name = "phoneNumber", nullable = false)
    private String phoneNumber;

    @Column(name = "numberOfPenalty", nullable = false)
    private int numberOfPenalty;

    @OneToOne
    @JoinColumn(name="loyaltyProgram", referencedColumnName = "id")
    private LoyaltyProgram loyaltyProgram;

    public Customer() {}
    public Customer(String firstName, String lastName, String address, String city, String country,
                                String phoneNumber, String email, String password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.country = country;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
    }
}