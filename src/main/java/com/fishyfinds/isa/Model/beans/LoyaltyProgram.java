package com.fishyfinds.isa.Model.beans;

public class LoyaltyProgram {

	private int id;
	private String categoryName;
	private int requiredPoints;
	private double categoryDiscount;
	private double earningRate;
	public int getId() {
		return id;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public int getRequiredPoints() {
		return requiredPoints;
	}
	public double getCategoryDiscount() {
		return categoryDiscount;
	}
	public double getEarningRate() {
		return earningRate;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public void setRequiredPoints(int requiredPoints) {
		this.requiredPoints = requiredPoints;
	}
	public void setCategoryDiscount(double categoryDiscount) {
		this.categoryDiscount = categoryDiscount;
	}
	public void setEarningRate(double earningRate) {
		this.earningRate = earningRate;
	}
	
}
