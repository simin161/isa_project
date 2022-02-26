package com.fishyfinds.isa.repository;

import com.fishyfinds.isa.model.beans.AccountDeletionRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountDeletionRequestRepository extends JpaRepository<AccountDeletionRequest, Long> {
}
