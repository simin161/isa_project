package model.beans;

public class Location {

	private double longitude;
	private double lattitude;
	private String address;
	public double getLongitude() {
		return longitude;
	}
	public double getLattitude() {
		return lattitude;
	}
	public String getAddress() {
		return address;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public void setLattitude(double lattitude) {
		this.lattitude = lattitude;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	
}
