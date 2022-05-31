package com.fishyfinds.isa.service.termsService;

import com.fishyfinds.isa.dto.TermDto;
import com.fishyfinds.isa.model.beans.Term;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class TermsService {

    @Autowired
    private BungalowTermService bungalowTermService;

    public List<TermDto> filterAvailableTerms(Map<String, String> message) {
        List<TermDto> temp = new ArrayList<>();
        if(message.get("offerType").equals("BUNGALOW"))
            temp = bungalowTermService.findAll();
        else if(message.get("offerType").equals("BOAT"))
            //temp = boatTermService.findAll();
            System.out.println("todo");
        else
            //temp = courseTermService.findAll();
            System.out.println("sdfa");
        //DateFormat: yyyy-mm-ddThh:mm
        LocalDateTime startDateTime = LocalDateTime.parse(message.get("start"), DateTimeFormatter.ISO_DATE_TIME);
        LocalDateTime endDateTime = LocalDateTime.parse(message.get("end"), DateTimeFormatter.ISO_DATE_TIME);
        List<TermDto> retVal = new ArrayList<>();
        for(TermDto dto : temp){
            if((startDateTime.isBefore(dto.startTime) || startDateTime.isEqual(dto.startTime)) && (dto.endTime.isBefore(endDateTime) || endDateTime.isEqual(dto.endTime))
                && !startDateTime.isAfter(dto.endTime) && !dto.endTime.isAfter(endDateTime))
                retVal.add(dto);
        }
        return retVal;
    }
}
