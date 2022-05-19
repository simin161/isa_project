package com.fishyfinds.isa.service;

import com.fishyfinds.isa.model.beans.Penal;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.repository.PenalRepository;
import com.fishyfinds.isa.repository.usersRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PenalService {

    @Autowired
    private PenalRepository penalRepository;
    @Autowired
    private UserRepository userRepository;

    public Penal getPenalForUser(String username) {
        Customer customer = (Customer) userRepository.findByEmail(username);
        return penalRepository.findByCustomer(customer);
    }

    @Scheduled(cron = "@monthly")
    public void annulPenals(){
        List<Penal> penals = penalRepository.findAll();

        for(Penal penal : penals){
            penal.setNumber(0);
            penalRepository.save(penal);
        }
    }
}
