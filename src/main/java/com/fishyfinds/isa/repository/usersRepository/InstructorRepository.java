package com.fishyfinds.isa.repository.usersRepository;

import com.fishyfinds.isa.model.beans.users.instructors.Instructor;
import com.fishyfinds.isa.model.beans.users.owners.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {

}
