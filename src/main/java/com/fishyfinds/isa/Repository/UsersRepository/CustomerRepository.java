package com.fishyfinds.isa.Repository.UsersRepository;

import com.fishyfinds.isa.Model.beans.users.customers.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    public Customer findByEmail(String email);

    public Customer findByVerificationCode(String verificationCode);
}
