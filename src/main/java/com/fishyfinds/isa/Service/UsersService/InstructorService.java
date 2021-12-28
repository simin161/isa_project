package com.fishyfinds.isa.Service.UsersService;

import com.fishyfinds.isa.Model.beans.users.instructors.Instructor;
import com.fishyfinds.isa.Repository.UsersRepository.InstructorRepository;
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
