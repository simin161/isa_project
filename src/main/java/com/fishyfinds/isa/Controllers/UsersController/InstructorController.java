package com.fishyfinds.isa.Controllers.UsersController;

import com.fishyfinds.isa.Model.beans.users.instructors.Instructor;
import com.fishyfinds.isa.Service.UsersService.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/api", produces= MediaType.APPLICATION_JSON_VALUE)
public class InstructorController {

    @Autowired
    private InstructorService instructorService;

    @GetMapping("/allInstructors")
    public List<Instructor> findAll(){
        return instructorService.findAll();
    }
}
