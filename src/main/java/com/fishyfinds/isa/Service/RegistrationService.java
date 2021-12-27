package com.fishyfinds.isa.Service;

import com.fishyfinds.isa.Model.beans.users.customers.Customer;
import com.fishyfinds.isa.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistrationService {
    @Autowired
    private CustomerRepository customerRepository;

    public void registerCustomer(Customer customer){
        if(!checkIfEmailExists(customer.getEmail())){
            //TODO: implement logic for sending email
            customerRepository.save(customer);
        }
    }

    private boolean checkIfEmailExists(String email){
        return customerRepository.findByEmail(email) != null;
    }
}
