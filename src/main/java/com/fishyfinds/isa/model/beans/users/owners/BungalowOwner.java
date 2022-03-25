package com.fishyfinds.isa.model.beans.users.owners;

import com.fishyfinds.isa.model.beans.LoyaltyProgram;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.enums.RegistrationStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;


@Entity
@Getter
@Setter
@Table(name = "BungalowOwner")
@PrimaryKeyJoinColumn(name = "id")
public class BungalowOwner extends User {

    @OneToMany(mappedBy="id", fetch = FetchType.EAGER)
    //@JoinColumn(name="id", nullable = true)
    private Set<Bungalow> bungalows;

    @OneToOne
    @JoinColumn(name="loyaltyProgram", referencedColumnName = "id")
    private LoyaltyProgram loyaltyProgram;

    @Column(name = "reasoning", nullable = false)
    private String reasoning;

    @Column(name = "registrationStatus", nullable = false)
    private RegistrationStatus registrationStatus = RegistrationStatus.WAITING_FOR_RESPONSE;

    public BungalowOwner() {}
    public BungalowOwner(String firstName, String lastName, String address, String city, String country,
                 String phoneNumber, String email, String password, String reasoning){
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.country = country;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.reasoning = reasoning;
    }
}
