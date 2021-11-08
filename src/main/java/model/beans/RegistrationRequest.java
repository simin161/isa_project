package model.beans;
import model.enums.RegistrationStatus;

public class RegistrationRequest {

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
	public String getFirstName() {
		return firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public String getEmail() {
		return email;
	}
	public String getPassword() {
		return password;
	}
	public String getCountry() {
		return country;
	}
	public String getCity() {
		return city;
	}
	public String getAddress() {
		return address;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public String getRegistrationType() {
		return registrationType;
	}
	public String getRegistrationReasoning() {
		return registrationReasoning;
	}
	public RegistrationStatus getRegistrationStatus() {
		return registrationStatus;
	}
	public String getStatusReasoning() {
		return statusReasoning;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public void setRegistrationType(String registrationType) {
		this.registrationType = registrationType;
	}
	public void setRegistrationReasoning(String registrationReasoning) {
		this.registrationReasoning = registrationReasoning;
	}
	public void setRegistrationStatus(RegistrationStatus registrationStatus) {
		this.registrationStatus = registrationStatus;
	}
	public void setStatusReasoning(String statusReasoning) {
		this.statusReasoning = statusReasoning;
	}
	
	
}
