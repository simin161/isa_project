package com.fishyfinds.isa.Model.beans.users.instructors;

import com.fishyfinds.isa.Model.beans.LoyaltyProgram;
import com.fishyfinds.isa.Model.beans.offers.courses.Course;
import com.fishyfinds.isa.Model.beans.users.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "Instructor")
@PrimaryKeyJoinColumn(name = "id")
public class Instructor extends User {

	@OneToMany
	@JoinColumn(name="courses", referencedColumnName = "id")
	private Set<Course> courses;

	@OneToOne
	@JoinColumn(name="loyaltyProgram", referencedColumnName = "id")
	private LoyaltyProgram loyaltyProgram;

	@Column(name = "biography", nullable = false)
	private String biography;
	
}
