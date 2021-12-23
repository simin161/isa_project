package com.fishyfinds.isa.Model.beans.users.owners;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Owner_Boat")
public class OwnerBoat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="ownerId", nullable = false, insertable = false, updatable = false)
    private int ownerId;

    @Column(name="boatId", nullable = false, insertable = false, updatable = false)
    private int boatId;

}
