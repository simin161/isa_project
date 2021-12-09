package com.fishyfinds.isa.Model.beans;

public class Boat extends Offer{

	private Engine engine;
	private double boatLength;
	private String boatType;
	private String navigationTools; //?? KAKAV JE 
	private String fishingTools; //?? KONCENZUS????
	
	public Engine getEngine() {
		return engine;
	}
	public double getBoatLength() {
		return boatLength;
	}
	public String getBoatType() {
		return boatType;
	}
	public String getNavigationTools() {
		return navigationTools;
	}
	public String getFishingTools() {
		return fishingTools;
	}
	public void setEngine(Engine engine) {
		this.engine = engine;
	}
	public void setBoatLength(double boatLength) {
		this.boatLength = boatLength;
	}
	public void setBoatType(String boatType) {
		this.boatType = boatType;
	}
	public void setNavigationTools(String navigationTools) {
		this.navigationTools = navigationTools;
	}
	public void setFishingTools(String fishingTools) {
		this.fishingTools = fishingTools;
	}

}
