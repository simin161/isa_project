package com.fishyfinds.isa.mappers;

import com.fishyfinds.isa.dto.TermDto;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.beans.terms.bungalows.BungalowTerm;
import com.fishyfinds.isa.model.beans.users.User;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Map;

public class DtoToTerm {


    public static BungalowTerm MapToTerm(TermDto termDto, Bungalow bungalow) {
        return new BungalowTerm(
                bungalow,
                termDto.startTime,
                termDto.endTime
        );
    }


}
