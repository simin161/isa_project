package com.fishyfinds.isa.dto;

import com.fishyfinds.isa.model.beans.offers.AdditionalService;

import java.util.ArrayList;

public class AddNewBungalowDTO {

    private String offerName;

    private String country;
    private String city;
    private String street;
    private String streetNumber;

    private double longitude;
    private double latitude;

    private String description;
    private double unitPrice;
    private int maxCustomerCapacity;
    private int numberOfRooms;
    private int numberOfBeds;

    private String rulesOfConduct;
    private String cancellationPolicy;

    private ArrayList<AdditionalService> additionalServices;
    private ArrayList<String> image;

    public AddNewBungalowDTO(){}

    public AddNewBungalowDTO(String offerName, String country, String city, String street, String streetNumber, double longitude, double latitude, String description, double unitPrice, int maxCustomerCapacity, int numberOfRooms, int numberOfBeds, String rulesOfConduct, String cancellationPolicy, ArrayList<AdditionalService> additionalServices, ArrayList<String> image) {
        this.offerName = offerName;
        this.country = country;
        this.city = city;
        this.street = street;
        this.streetNumber = streetNumber;
        this.longitude = longitude;
        this.latitude = latitude;
        this.description = description;
        this.unitPrice = unitPrice;
        this.maxCustomerCapacity = maxCustomerCapacity;
        this.numberOfRooms = numberOfRooms;
        this.numberOfBeds = numberOfBeds;
        this.rulesOfConduct = rulesOfConduct;
        this.cancellationPolicy = cancellationPolicy;
        this.additionalServices = additionalServices;
        this.image = image;
    }

    @Override
    public String toString() {
        return "AddNewBungalowDto{" +
                "offerName='" + offerName + '\'' +
                ", country='" + country + '\'' +
                ", city='" + city + '\'' +
                ", street='" + street + '\'' +
                ", streetNumber='" + streetNumber + '\'' +
                ", longitude=" + longitude +
                ", latitude=" + latitude +
                ", description='" + description + '\'' +
                ", unitPrice=" + unitPrice +
                ", maxCustomerCapacity=" + maxCustomerCapacity +
                ", numberOfRooms=" + numberOfRooms +
                ", numberOfBeds=" + numberOfBeds +
                ", rulesOfConduct='" + rulesOfConduct + '\'' +
                ", cancellationPolicy='" + cancellationPolicy + '\'' +
                ", additionalServices=" + additionalServices +
                //", image=" + image +
                '}';
    }

    public String getOfferName() {
        return offerName;
    }

    public void setOfferName(String offerName) {
        this.offerName = offerName;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public int getMaxCustomerCapacity() {
        return maxCustomerCapacity;
    }

    public void setMaxCustomerCapacity(int maxCustomerCapacity) {
        this.maxCustomerCapacity = maxCustomerCapacity;
    }

    public int getNumberOfRooms() {
        return numberOfRooms;
    }

    public void setNumberOfRooms(int numberOfRooms) {
        this.numberOfRooms = numberOfRooms;
    }

    public int getNumberOfBeds() {
        return numberOfBeds;
    }

    public void setNumberOfBeds(int numberOfBeds) {
        this.numberOfBeds = numberOfBeds;
    }

    public String getRulesOfConduct() {
        return rulesOfConduct;
    }

    public void setRulesOfConduct(String rulesOfConduct) {
        this.rulesOfConduct = rulesOfConduct;
    }

    public String getCancellationPolicy() {
        return cancellationPolicy;
    }

    public void setCancellationPolicy(String cancellationPolicy) {
        this.cancellationPolicy = cancellationPolicy;
    }

    public ArrayList<AdditionalService> getAdditionalServices() {
        return additionalServices;
    }

    public void setAdditionalServices(ArrayList<AdditionalService> additionalServices) {
        this.additionalServices = additionalServices;
    }

    public ArrayList<String> getImage() {
        return image;
    }

    public void setImage(ArrayList<String> image) {
        this.image = image;
    }
}
