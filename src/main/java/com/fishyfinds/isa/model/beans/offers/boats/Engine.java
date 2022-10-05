package com.fishyfinds.isa.model.beans.offers.boats;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Engine")
@SequenceGenerator(name = "sequence", sequenceName = "mySequence")
public class Engine {

    @Id
    @GenericGenerator(name = "seq", strategy="increment")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seq")
    private Long id;

    @Column(name = "numberOfEngines")
    private int numberOfEngines;

    @Column(name = "power")
    private double power;

    @Column(name = "maxSpeed")
    private double maxSpeed;

}
