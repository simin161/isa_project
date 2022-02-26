package com.fishyfinds.isa.mappers;

import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;

import java.util.Map;

public class DtoToOffer {
    public static Bungalow MapToNewBungalow(Map<String, String> map) {
        return new Bungalow(map.get("offerName"), map.get("country"), map.get("city"),
                map.get("street"), map.get("streetNumber"), map.get("description"),
                Integer.valueOf(map.get("unitPrice")), Integer.valueOf(map.get("maxCustomerCapacity")), map.get("rulesOfConduct"),
                map.get("additionalServices"), map.get("cancellationPolicy")

        );
    }
}



