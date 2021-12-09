package com.fishyfinds.isa.Model.beans;

import java.util.List;

public class Instructor extends User {

	private List<Course> courses;
	private LoyaltyProgram loyaltyProgram;
	private String biography;
	
	public List<Course> getCourses() {
		return courses;
	}
	public LoyaltyProgram getLoyaltyProgram() {
		return loyaltyProgram;
	}
	public String getBiography() {
		return biography;
	}
	public void setCourses(List<Course> courses) {
		this.courses = courses;
	}
	public void setLoyaltyProgram(LoyaltyProgram loyaltyProgram) {
		this.loyaltyProgram = loyaltyProgram;
	}
	public void setBiography(String biography) {
		this.biography = biography;
	}
	
	
}
