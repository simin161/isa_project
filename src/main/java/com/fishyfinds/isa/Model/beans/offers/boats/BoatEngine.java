package com.fishyfinds.isa.Model.beans.offers.boats;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Boat_Engine")
public class BoatEngine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="boatId", nullable = false, insertable = false, updatable = false)
    private int boatId;

    @Column(name="boatId", nullable = false, insertable = false, updatable = false)
    private int engineId;

}
