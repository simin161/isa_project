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
	public int getId() {
		return id;
	}
	public OfferType getOfferType() {
		return offerType;
	}
	public String getOfferName() {
		return offerName;
	}
	public int getUserID() {
		return userID;
	}
	public List<Image> getImages() {
		return images;
	}
	public Location getLocation() {
		return location;
	}
	public String getDescription() {
		return description;
	}
	public double getUnitPrice() {
		return unitPrice;
	}
	public double getRating() {
		return rating;
	}
	public List<Term> getTerms() {
		return terms;
	}
	public int getMaxCustomerCapacity() {
		return maxCustomerCapacity;
	}
	public String getRulesOfConduct() {
		return rulesOfConduct;
	}
	public String getAdditionalServices() {
		return additionalServices;
	}
	public String getCancellationPolicy() {
		return cancellationPolicy;
	}
	public List<UserFeedback> getReviews() {
		return reviews;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setOfferType(OfferType offerType) {
		this.offerType = offerType;
	}
	public void setOfferName(String offerName) {
		this.offerName = offerName;
	}
	public void setUserID(int userID) {
		this.userID = userID;
	}
	public void setImages(List<Image> images) {
		this.images = images;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public void setUnitPrice(double unitPrice) {
		this.unitPrice = unitPrice;
	}
	public void setRating(double rating) {
		this.rating = rating;
	}
	public void setTerms(List<Term> terms) {
		this.terms = terms;
	}
	public void setMaxCustomerCapacity(int maxCustomerCapacity) {
		this.maxCustomerCapacity = maxCustomerCapacity;
	}
	public void setRulesOfConduct(String rulesOfConduct) {
		this.rulesOfConduct = rulesOfConduct;
	}
	public void setAdditionalServices(String additionalServices) {
		this.additionalServices = additionalServices;
	}
	public void setCancellationPolicy(String cancellationPolicy) {
		this.cancellationPolicy = cancellationPolicy;
	}
	public void setReviews(List<UserFeedback> reviews) {
		this.reviews = reviews;
	}
	
}
