package com.fishyfinds.isa.dto;

import com.fishyfinds.isa.model.beans.offers.Offer;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OfferDTO {
    private Offer offer;
    private boolean isFollowed;
    private String path;
}
