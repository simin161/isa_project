package com.fishyfinds.isa.model.beans.offers.services;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class AdditionalService{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    public AdditionalService() { }

    public AdditionalService(Long id, String name) {
        this.id = id;
        this.name = name;
    }

}
