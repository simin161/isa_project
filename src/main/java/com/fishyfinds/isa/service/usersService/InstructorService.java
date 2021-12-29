package com.fishyfinds.isa.service.usersService;

import com.fishyfinds.isa.model.beans.users.instructors.Instructor;
import com.fishyfinds.isa.repository.usersRepository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstructorService {

    @Autowired
    private InstructorRepository instructorRepository;

    public List<Instructor> findAll(){
        return instructorRepository.findAll();
    }

}
