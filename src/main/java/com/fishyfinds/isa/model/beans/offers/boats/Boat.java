package com.fishyfinds.isa.model.beans.offers.boats;

import com.fishyfinds.isa.model.beans.offers.Offer;
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

	public Boat() {}

}
