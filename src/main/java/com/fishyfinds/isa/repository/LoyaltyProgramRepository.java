package com.fishyfinds.isa.repository;

import com.fishyfinds.isa.model.beans.LoyaltyProgram;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoyaltyProgramRepository extends JpaRepository<LoyaltyProgram, Long> {
}
