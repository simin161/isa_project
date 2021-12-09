package com.fishyfinds.isa.Model.beans;

import java.util.Date;

public class Term {
	private int id;
	private Date start;
	private int duration;
	private int customerCapacity;
	private boolean isReserved;
	public int getId() {
		return id;
	}
	public Date getStart() {
		return start;
	}
	public int getDuration() {
		return duration;
	}
	public int getCustomerCapacity() {
		return customerCapacity;
	}
	public boolean isReserved() {
		return isReserved;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setStart(Date start) {
		this.start = start;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public void setCustomerCapacity(int customerCapacity) {
		this.customerCapacity = customerCapacity;
	}
	public void setReserved(boolean isReserved) {
		this.isReserved = isReserved;
	}
	
	
}
