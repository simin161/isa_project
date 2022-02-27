package com.fishyfinds.isa.controllers.offersController;

import com.fishyfinds.isa.model.beans.offers.courses.Course;
import com.fishyfinds.isa.service.offersService.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping("/allCourses")
    public List<Course> findAll(){
        return courseService.findAll();
    }
}
