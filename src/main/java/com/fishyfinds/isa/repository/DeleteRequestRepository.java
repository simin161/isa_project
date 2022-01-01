package com.fishyfinds.isa.repository;

import com.fishyfinds.isa.model.beans.DeleteRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeleteRequestRepository extends JpaRepository<DeleteRequest, Long> {
}
