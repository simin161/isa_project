package com.fishyfinds.isa.Model.beans;

public abstract class User {
	
	protected int id;
	protected String firstName;
	protected String lastName;
	protected String password;
	protected String email;
	protected boolean isDeleted;
	public int getId() {
		return id;
	}
	public String getFirstName() {
		return firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public String getPassword() {
		return password;
	}
	public String getEmail() {
		return email;
	}
	public boolean isDeleted() {
		return isDeleted;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	
	
}
