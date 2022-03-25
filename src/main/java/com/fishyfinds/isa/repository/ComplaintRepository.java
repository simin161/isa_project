package com.fishyfinds.isa.repository;

import com.fishyfinds.isa.model.beans.Complaint;
import com.fishyfinds.isa.model.beans.offers.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {
}
