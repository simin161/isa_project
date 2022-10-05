package com.fishyfinds.isa.mappers;

import com.fishyfinds.isa.dto.TermDTO;
import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.terms.Term;

public class DtoToTerm {

    public static Term MapToTerm(TermDTO termDto, Offer offer) {
        return new Term(offer, termDto.startTime, termDto.endTime);
    }


}
