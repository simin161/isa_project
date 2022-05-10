package com.fishyfinds.isa.model.beans.offers.services;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class FishingTool {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    public FishingTool() { }

    public FishingTool(Long id, String name) {
        this.id = id;
        this.name = name;
    }

}
