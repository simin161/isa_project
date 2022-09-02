package com.fishyfinds.isa.mappers;

import com.fishyfinds.isa.model.beans.UserFeedback;
import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.terms.Reservation;

import java.util.Map;

public class DtoToFeedback {

    public static UserFeedback MapToUserFeedback(Map<String, String> map){
        UserFeedback feedback = new UserFeedback();
        if(map.get("rateForOffer") == null)
            feedback.setRateOffer(0);
        else{
            feedback.setRateOffer(Integer.parseInt(map.get("rateForOffer")));
        }

        if(map.get("rateForOwner") == null)
            feedback.setRateOffer(0);
        else{
            feedback.setRateOffer(Integer.parseInt(map.get("rateForOwner")));
        }

        feedback.setContentForOffer(map.get("contentForOffer"));
        feedback.setContentForOwner(map.get("contentForOwner"));
        Reservation o = new Reservation();
        o.setId(Long.parseLong(map.get("id")));
        feedback.setReservation(o);

        return feedback;
    }
}
