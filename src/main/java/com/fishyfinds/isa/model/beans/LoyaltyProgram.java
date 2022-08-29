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

    @Column(name = "minPoints")
    private int minPoints;

    @Column(name = "categoryDiscount")
    private double categoryDiscount;

    @Column(name = "earningRate")
    private double earningRate;

    @Column(name = "maxPoints")
    private int maxPoints;

    // ako je 0 onda je customer, ako je 1 onda je instruktor i owner
    @Column(name = "type")
    private int type;

}