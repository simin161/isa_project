package com.fishyfinds.isa.Model.beans;

import com.fishyfinds.isa.Model.enums.OfferType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Price")
public class Price {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "offerId")
	private int offerId;

	@Column(name = "offerType")
	private OfferType offerType;

	@Column(name = "cost")
	private double cost;

}
