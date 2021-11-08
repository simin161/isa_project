package model.beans;

public class Customer extends User{

	private String country;
	private String city;
	private String address;
	private String phoneNumber;
	private int numberOfPenalty;
	private LoyaltyProgram loyaltyProgram;
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
	public int getNumberOfPenalty() {
		return numberOfPenalty;
	}
	public LoyaltyProgram getLoyaltyProgram() {
		return loyaltyProgram;
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
	public void setNumberOfPenalty(int numberOfPenalty) {
		this.numberOfPenalty = numberOfPenalty;
	}
	public void setLoyaltyProgram(LoyaltyProgram loyaltyProgram) {
		this.loyaltyProgram = loyaltyProgram;
	}
	
	
	
}
