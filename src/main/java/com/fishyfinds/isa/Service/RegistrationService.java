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

    public Customer findOne(Long id) {
        return customerRepository.findById(id).orElseGet(null);
    }

    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    public Page<Customer> findAll(Pageable page) {
        return customerRepository.findAll(page);
    }

    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }

    public void remove(Long id) {
        customerRepository.deleteById(id);
    }
    public void registerCustomer(Customer customer){
        save(customer);
    }
}
