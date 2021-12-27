package com.fishyfinds.isa.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerRegistration {
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private String country;
    private String phoneNumber;
    private String email;
    private String password;

    public CustomerRegistration(String firstName, String lastName, String address, String city, String country,
                                String phoneNumber, String email, String password){
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
