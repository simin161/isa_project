package com.fishyfinds.isa.service.offersService;

import com.fishyfinds.isa.model.beans.offers.courses.Course;
import com.fishyfinds.isa.repository.offersRepository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public List<Course> findAll(){
        return courseRepository.findAll();
    }
}
