package com.fishyfinds.isa.mappers;

import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.beans.users.User;

import java.util.ArrayList;
import java.util.Map;

public class DtoToOffer {

    public static Bungalow MapToNewBungalow(Map<String, ArrayList<String>> map, User user) {
        return new Bungalow(
                map.get("offerName").get(0),
                user,
                map.get("country").get(0),
                map.get("city").get(0),
                map.get("street").get(0),
                map.get("streetNumber").get(0),
                map.get("description").get(0),
                Integer.parseInt(map.get("unitPrice").get(0)),
                Integer.parseInt(map.get("maxCustomerCapacity").get(0)),
                Integer.parseInt(map.get("numberOfBeds").get(0)),
                Integer.parseInt(map.get("numberOfRooms").get(0)),
                map.get("rulesOfConduct").get(0),
                //map.get("additionalServices").get(0),
                map.get("cancellationPolicy").get(0)
        );
    }
}



