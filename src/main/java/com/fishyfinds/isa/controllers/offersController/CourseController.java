package com.fishyfinds.isa.controllers.offersController;

import com.fishyfinds.isa.dto.OfferDTO;
import com.fishyfinds.isa.model.beans.Subscriber;
import com.fishyfinds.isa.model.beans.offers.boats.Boat;
import com.fishyfinds.isa.model.beans.offers.courses.Course;
import com.fishyfinds.isa.security.TokenUtils;
import com.fishyfinds.isa.service.SubscriberService;
import com.fishyfinds.isa.service.offersService.CourseService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class CourseController {

    @Autowired
    private CourseService courseService;
    @Autowired
    private TokenUtils tokenUtils;
    @Autowired
    private SubscriberService subscriberService;
    @GetMapping("/allCourses")
    public List<OfferDTO> findAll(@RequestHeader("Authorization") HttpHeaders header){
        List<Course> boats  = courseService.findAll();
        List<OfferDTO> retVal = new ArrayList<OfferDTO>();
        try {
            final String value = header.getFirst(HttpHeaders.AUTHORIZATION);
            if(value != null && !value.isEmpty()){
                final JSONObject obj = new JSONObject(value);
                String user = obj.getString("accessToken");
                String username = tokenUtils.getUsernameFromToken(user);
                List<Subscriber> subscribers = subscriberService.getSubscriptionsByUser(username);
                for(Course b : boats){
                    OfferDTO dto = new OfferDTO();
                    dto.setOffer(b);
                    for(Subscriber s : subscribers){
                        if(s.isRelevant() && s.getFollowing().getId().equals(b.getId())){
                            dto.setFollowed(true);
                            break;
                        }
                    }
                    retVal.add(dto);
                }}
            else{
                for(Course b : boats){
                    OfferDTO dto = new OfferDTO();
                    dto.setOffer(b);
                    retVal.add(dto);
                }
            }
        }catch(Exception e){

        }
        return retVal;
    }
}
