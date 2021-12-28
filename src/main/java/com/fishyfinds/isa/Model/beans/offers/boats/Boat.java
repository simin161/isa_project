package com.fishyfinds.isa.Model.beans.offers.boats;

import com.fishyfinds.isa.Model.beans.offers.Offer;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Boat")
@PrimaryKeyJoinColumn(name = "id")
public class Boat extends Offer {

	@OneToOne
	@JoinColumn(name = "engine", referencedColumnName = "id")
	private Engine engine;

	@Column(name = "boatLength", nullable = false)
	private double boatLength;

	@Column(name = "boatType", nullable = false)
	private String boatType;

	//OVO ISPOD CE VRV BITI OBJEKTI ALI ZA POCETAK STRINGICIII

	@Column(name = "navigationTools", nullable = false)
	private String navigationTools;

	@Column(name = "fishingTools", nullable = false)
	private String fishingTools;


}
