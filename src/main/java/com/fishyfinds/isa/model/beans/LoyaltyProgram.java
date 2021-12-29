package com.fishyfinds.isa.model.beans;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "LoyaltyProgram")
public class LoyaltyProgram {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "categoryName")
    private String categoryName;

    @Column(name = "requiredPoints")
    private int requiredPoints;

    @Column(name = "categoryDiscount")
    private double categoryDiscount;

    @Column(name = "earningRate")
    private double earningRate;

}
