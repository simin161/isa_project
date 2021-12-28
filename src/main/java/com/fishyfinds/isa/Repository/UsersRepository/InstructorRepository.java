package com.fishyfinds.isa.Repository.UsersRepository;

import com.fishyfinds.isa.Model.beans.users.instructors.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {
}
