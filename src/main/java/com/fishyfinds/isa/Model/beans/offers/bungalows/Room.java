package com.fishyfinds.isa.Model.beans.offers.bungalows;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Room")
public class Room {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "numberOfBeds")
	private int numberOfBeds;

	
	
}
