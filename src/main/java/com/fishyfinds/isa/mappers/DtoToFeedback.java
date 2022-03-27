package com.fishyfinds.isa.mappers;

import com.fishyfinds.isa.model.beans.UserFeedback;
import com.fishyfinds.isa.model.beans.offers.Offer;

import java.util.Map;

public class DtoToFeedback {

    public static UserFeedback MapToUserFeedback(Map<String, String> map){
        UserFeedback feedback = new UserFeedback();
        feedback.setContent(map.get("content"));
        feedback.setRate(Integer.parseInt(map.get("rate")));
        Offer o = new Offer();
        o.setId(Long.parseLong(map.get("id")));
        feedback.setOffer(o);

        return feedback;
    }
}
