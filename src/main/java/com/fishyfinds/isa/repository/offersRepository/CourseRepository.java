package com.fishyfinds.isa.repository.offersRepository;

import com.fishyfinds.isa.model.beans.offers.courses.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
