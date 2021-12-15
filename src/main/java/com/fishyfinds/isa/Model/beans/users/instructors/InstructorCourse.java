package com.fishyfinds.isa.Model.beans.users.instructors;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Instructor_Course")
public class InstructorCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="instructorId", nullable = false, insertable = false, updatable = false)
    private int instructorId;

    @Column(name="courseId", nullable = false, insertable = false, updatable = false)
    private int courseId;

}
