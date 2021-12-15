package com.fishyfinds.isa.Model.beans.offers.bungalows;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Bungalow_Room")
public class BungalowRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="bungalowId", nullable = false, insertable = false, updatable = false)
    private int bungalowId;

    @Column(name="roomId", nullable = false, insertable = false, updatable = false)
    private int roomId;

}
