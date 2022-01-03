package com.fishyfinds.isa.service;

import com.fishyfinds.isa.model.beans.AccountDeletionRequest;
import com.fishyfinds.isa.repository.AccountDeletionRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountDeletionRequestService {

    @Autowired
    private AccountDeletionRequestRepository accountDeletionRequestRepository;

    public void add(AccountDeletionRequest accountDeletionRequest){
        accountDeletionRequestRepository.save(accountDeletionRequest);
    }
}
