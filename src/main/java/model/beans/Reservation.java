package model.beans;

public class Reservation {

	private int id;
	private int priceId;
	private int termId;
	private int customerId;
	private int numberOfGuests;
	private double reservationDiscount;
	private boolean hasSupervisor;
	public int getId() {
		return id;
	}
	public int getPriceId() {
		return priceId;
	}
	public int getTermId() {
		return termId;
	}
	public int getCustomerId() {
		return customerId;
	}
	public int getNumberOfGuests() {
		return numberOfGuests;
	}
	public double getReservationDiscount() {
		return reservationDiscount;
	}
	public boolean isHasSupervisor() {
		return hasSupervisor;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setPriceId(int priceId) {
		this.priceId = priceId;
	}
	public void setTermId(int termId) {
		this.termId = termId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	public void setNumberOfGuests(int numberOfGuests) {
		this.numberOfGuests = numberOfGuests;
	}
	public void setReservationDiscount(double reservationDiscount) {
		this.reservationDiscount = reservationDiscount;
	}
	public void setHasSupervisor(boolean hasSupervisor) {
		this.hasSupervisor = hasSupervisor;
	}
	
	
}
