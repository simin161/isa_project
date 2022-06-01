package com.fishyfinds.isa.service.termsService;

import com.fishyfinds.isa.dto.TermDto;
import com.fishyfinds.isa.model.beans.Term;
import com.fishyfinds.isa.model.beans.offers.courses.Course;
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
    @Autowired
    private BoatTermService boatTermService;
    @Autowired
    private BungalowReservationService bungalowReservationService;
    @Autowired
    private BoatReservationService boatReservationService;
    @Autowired
    private CourseReservationService courseReservationService;

    public List<TermDto> filterAvailableTerms(Map<String, String> message) {
        List<TermDto> temp = new ArrayList<>();
        if(message.get("offerType").equals("BUNGALOW"))
            temp = bungalowTermService.findAll();
        else if(message.get("offerType").equals("BOAT"))
            temp = boatTermService.findAll();
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

    public boolean makeReservation(Map<String, String> message) {
        boolean retVal = false;
        if(message.get("offerType").equals("BUNGALOW"))
           retVal = bungalowReservationService.makeReservation(message);
        else if(message.get("offerType").equals("BOAT"))
           retVal = boatReservationService.makeReservation(message);
        else
          retVal = courseReservationService.makeReservation(message);

        return retVal;
    }
}
