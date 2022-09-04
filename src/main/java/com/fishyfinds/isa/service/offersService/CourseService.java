package com.fishyfinds.isa.service.offersService;

import com.fishyfinds.isa.model.beans.offers.AdditionalService;
import com.fishyfinds.isa.model.beans.offers.Location;
import com.fishyfinds.isa.model.beans.offers.courses.Course;
import com.fishyfinds.isa.model.enums.OfferType;
import com.fishyfinds.isa.repository.offersRepository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private AdditionalServiceService additionalServiceService;

    public List<Course> findAll(){
        return courseRepository.findAll();
    }

    public void addNewCourse(String email, Map<String, String> message) {
        Course course = new Course();
        course.setDescription(message.get("description"));
        Set<AdditionalService> services = new HashSet<>();
        String []parts = message.get("checkboxesChecked").split(" ");
        for(String s : parts){
            AdditionalService as = additionalServiceService.findByName(s);
            services.add(as);
        }
        course.setAdditionalServices(services);
        course.setCancellationPolicy(message.get("cancellationPolicy"));
        course.setLocation(new Location(message.get("country"), message.get("city"), message.get("street"), message.get("streetNumber")));
        course.setMaxCustomerCapacity(Integer.parseInt(message.get("maxCapacity")));
        course.setOfferType(OfferType.COURSE);
        course.setOfferName(message.get("offerName"));
        course.setRating(0.0);
        course.setRulesOfConduct(message.get("rulesOfConduct"));
        courseRepository.save(course);
    }
}
