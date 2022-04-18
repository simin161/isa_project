package com.fishyfinds.isa.model.beans.offers.bungalows;

import com.fishyfinds.isa.model.beans.offers.Location;
import com.fishyfinds.isa.model.beans.offers.Offer;
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

	public Bungalow() {}
	public Bungalow(String offerName, String country,
					String city, String street, String streetNumber,
					String description,  int unitPrice, int maxCustomerCapacity,
					String rulesOfConduct, String additionalServices, String cancellationPolicy)
	{
		this.offerName = offerName;
		this.location = new Location(country,city,street,streetNumber);
		this.description = description;
		this.unitPrice = unitPrice;
		this.maxCustomerCapacity = maxCustomerCapacity;
		this.rulesOfConduct = rulesOfConduct;
		this.additionalServices = additionalServices;
		this.cancellationPolicy = cancellationPolicy;

	}



}
