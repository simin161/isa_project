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
        List<TermDto> retVal = new ArrayList<>();
        if(message.get("offerType").equals("BUNGALOW"))
            retVal = bungalowTermService.findAll();
        else if(message.get("offerType").equals("BOAT"))
            //retVal = boatTermService.findAll();
            System.out.println("todo");
        else
            //retVal = courseTermService.findAll();
            System.out.println("sdfa");
        //DateFormat: yyyy-mm-ddThh:mm
        LocalDateTime startDateTime = LocalDateTime.parse(message.get("start"), DateTimeFormatter.ISO_DATE_TIME);
        LocalDateTime endDateTime = LocalDateTime.parse(message.get("end"), DateTimeFormatter.ISO_DATE_TIME);
        for(TermDto dto : retVal){

        }

        return retVal;
    }
}
