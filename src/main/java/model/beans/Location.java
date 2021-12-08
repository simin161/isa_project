package model.beans;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Location{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "longitude")
	private Double longitude;
	@Column(name = "lattitude")
	private Double lattitude;
	@Column(name = "address")
	private String address;
	public Long getId() {
		return id;
	}
	public Double getLongitude() {
		return longitude;
	}
	public Double getLattitude() {
		return lattitude;
	}
	public String getAddress() {
		return address;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}
	public void setLattitude(Double lattitude) {
		this.lattitude = lattitude;
	}
	public void setAddress(String address) {
		this.address = address;
	}	
}
