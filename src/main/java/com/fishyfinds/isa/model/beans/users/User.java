package com.fishyfinds.isa.model.beans.users;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Table(name = "Users")
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(name = "firstName", nullable = false)
    protected String firstName;

    @Column(name = "lastName", nullable = false)
    protected String lastName;

    @Column(name = "password", nullable = false)
    protected String password;

    @Column(name = "email", nullable = false)
    protected String email;

    @Column(name = "country", nullable = false)
    protected String country;

    @Column(name = "city", nullable = false)
    protected String city;

    @Column(name = "address", nullable = false)
    protected String address;

    @Column(name = "phoneNumber", nullable = false)
    protected String phoneNumber;

    @Column(name = "isDeleted", nullable = false)
    protected boolean isDeleted;

    @Column(name="isActivated", nullable=false)
    protected boolean isActivated;

    @Column(name="verificationCode", nullable=false)
    protected String verificationCode;

    public User() {}
    public User(String firstName, String lastName, String address, String city, String country, String phoneNumber, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.country = country;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
    }
}
