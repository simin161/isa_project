package com.fishyfinds.isa.model.beans.offers;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Location")
@SequenceGenerator(name = "sequence", sequenceName = "mySequence")
public class Location{

    @Id
    @GenericGenerator(name = "seq", strategy="increment")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seq")
    private Long id;

    @Column(name = "longitude")
    private double longitude = 0;

    @Column(name = "latitude")
    private double latitude = 0;

    @Column(name = "country")
    private String country;

    @Column(name = "city")
    private String city;

    @Column(name = "street")
    private String street;

    @Column(name = "streetNumber")
    private String streetNumber;

    public Location(){}

    public Location(String country, String city, String street, String streetNumber){
        this.country = country;
        this.city = city;
        this.street = street;
        this.streetNumber = streetNumber;
    }

}
