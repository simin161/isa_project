package com.fishyfinds.isa.Model.beans.offers.boats;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Engine")
public class Engine {

      @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "numberOfEngines")
    private int numberOfEngines;

    @Column(name = "power")
    private double power;

    @Column(name = "maxSpeed")
    private double maxSpeed;

}
