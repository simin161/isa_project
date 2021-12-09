package com.fishyfinds.isa.Model.beans;

import com.fishyfinds.isa.Model.enums.OfferType;

public class Price {
	private int id;
	private int offerId;
	private OfferType offerType;
	private double cost;
	public int getId() {
		return id;
	}
	public int getOfferId() {
		return offerId;
	}
	public OfferType getOfferType() {
		return offerType;
	}
	public double getCost() {
		return cost;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setOfferId(int offerId) {
		this.offerId = offerId;
	}
	public void setOfferType(OfferType offerType) {
		this.offerType = offerType;
	}
	public void setCost(double cost) {
		this.cost = cost;
	}
	
	
}
