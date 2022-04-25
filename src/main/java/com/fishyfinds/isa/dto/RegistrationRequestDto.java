package com.fishyfinds.isa.dto;


import com.fishyfinds.isa.model.enums.RegistrationStatus;

public class RegistrationRequestDto {

	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String country;
	private String city;
	private String address;
	private String phoneNumber;
	private String registrationType;
	private String registrationReasoning;
	private RegistrationStatus registrationStatus;
	private String statusReasoning;

}
