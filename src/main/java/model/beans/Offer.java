package model.beans;

import java.awt.Image;
import java.util.List;

import model.enums.OfferType;

public abstract class Offer {

	protected int id;
	protected OfferType offerType;
	protected String offerName;
	protected int userID;
	protected List<Image> images;
	protected Location location;
	protected String description;
	protected double unitPrice;
	protected double rating;
	protected List<Term> terms;
	protected int maxCustomerCapacity;
	protected String rulesOfConduct;
	protected String additionalServices;
	protected String cancellationPolicy;
	protected List<UserFeedback> reviews;
	
}
