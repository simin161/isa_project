package model.beans;

public class Engine {

	private int id;
	private int numberOfEngines;
	private double power;
	private double maxSpeed;
	public int getId() {
		return id;
	}
	public int getNumberOfEngines() {
		return numberOfEngines;
	}
	public double getPower() {
		return power;
	}
	public double getMaxSpeed() {
		return maxSpeed;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setNumberOfEngines(int numberOfEngines) {
		this.numberOfEngines = numberOfEngines;
	}
	public void setPower(double power) {
		this.power = power;
	}
	public void setMaxSpeed(double maxSpeed) {
		this.maxSpeed = maxSpeed;
	}
	
	
}
