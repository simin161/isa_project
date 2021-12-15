package com.fishyfinds.isa.Model.beans.users.owners;

import com.fishyfinds.isa.Model.beans.LoyaltyProgram;
import com.fishyfinds.isa.Model.beans.offers.boats.Boat;
import com.fishyfinds.isa.Model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.Model.beans.users.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "Owner")
@PrimaryKeyJoinColumn(name = "id")
public class Owner extends User {

    @OneToMany
    @JoinColumn(name="id")
    private Set<Bungalow> bungalows;

    @OneToMany
    @JoinColumn(name="id")
    private Set<Boat> boats;

    @OneToOne
    @JoinColumn(name="loyaltyProgram", referencedColumnName = "id")
    private LoyaltyProgram loyaltyProgram;


}