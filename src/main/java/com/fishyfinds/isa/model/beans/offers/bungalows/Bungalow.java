package com.fishyfinds.isa.model.beans.offers.bungalows;

import com.fishyfinds.isa.model.beans.offers.AdditionalService;
import com.fishyfinds.isa.model.beans.offers.Location;
import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.users.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "Bungalow")
@PrimaryKeyJoinColumn(name = "id")
public class Bungalow extends Offer {

	@Column(name = "numberOfBeds", nullable = false)
	private int numberOfBeds;

	@Column(name = "numberOfRooms", nullable = false)
	private int numberOfRooms;

	public Bungalow() {}
	public Bungalow(String offerName, User user,
					String country, String city, String street, String streetNumber,
					String description, int unitPrice,
					int maxCustomerCapacity, int numberOfBeds, int numberOfRooms,
					String rulesOfConduct, String cancellationPolicy,
					Set<AdditionalService> additionalServices)
	{

		this.offerName = offerName;
		this.user = user;
		this.location = new Location(country,city,street,streetNumber);
		this.description = description;
		this.unitPrice = unitPrice;
		this.maxCustomerCapacity = maxCustomerCapacity;
		this.numberOfBeds = numberOfBeds;
		this.numberOfRooms = numberOfRooms;
		this.rulesOfConduct = rulesOfConduct;
		this.cancellationPolicy = cancellationPolicy;
		this.additionalServices = additionalServices;

	}

}
