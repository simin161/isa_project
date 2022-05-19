package com.fishyfinds.isa.repository;

import com.fishyfinds.isa.model.beans.Penal;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PenalRepository extends JpaRepository<Penal, Long> {
    Penal findByCustomer(Customer customer);
}
