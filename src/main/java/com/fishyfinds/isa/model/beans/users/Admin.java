package com.fishyfinds.isa.model.beans.users;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "Admin")
@PrimaryKeyJoinColumn(name = "id")
public class Admin extends User {

	@Column(name = "earningPercentage")
	private double earningPercentage;

	public Admin() {}

	public Admin(String firstName, String lastName, String address, String city, String country,
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
