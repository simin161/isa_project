package com.fishyfinds.isa.service.offersService;

import com.fishyfinds.isa.model.beans.offers.courses.Course;
import com.fishyfinds.isa.repository.offersRepository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public List<Course> findAll(){
        return courseRepository.findAll();
    }

    public void addNewCourse(String email, Map<String, String> message) {
        Course course = new Course();
        course.setDescription(message.get("description"));
        //course.setAdditionalServices();
    }
}
