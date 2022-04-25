package com.fishyfinds.isa.mappers;

import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.beans.users.User;

import java.util.Map;

public class DtoToOffer {

    public static Bungalow MapToNewBungalow(Map<String, String> map, User user) {
        return new Bungalow(
                map.get("offerName"),
                user,
                map.get("country"),
                map.get("city"),
                map.get("street"),
                map.get("streetNumber"),
                map.get("description"),
                Integer.parseInt(map.get("unitPrice")),
                Integer.parseInt(map.get("maxCustomerCapacity")),
                Integer.parseInt(map.get("numberOfBeds")),
                Integer.parseInt(map.get("numberOfRooms")),
                map.get("rulesOfConduct"),
                map.get("additionalServices"),
                map.get("cancellationPolicy")
        );
    }
}



