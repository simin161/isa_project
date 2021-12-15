package com.fishyfinds.isa.Model.beans.offers.bungalows;

import com.fishyfinds.isa.Model.beans.offers.Offer;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "Bungalow")
@PrimaryKeyJoinColumn(name = "id")
public class Bungalow extends Offer {

	@OneToMany
	@JoinColumn(name="id")
	private Set<Room> rooms;
	
}
