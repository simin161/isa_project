package com.fishyfinds.isa.service;

import com.fishyfinds.isa.model.beans.AccountDeletionRequest;
import com.fishyfinds.isa.repository.AccountDeletionRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountDeletionRequestService {

    @Autowired
    private AccountDeletionRequestRepository accountDeletionRequestRepository;

    public void add(AccountDeletionRequest accountDeletionRequest){
        accountDeletionRequestRepository.save(accountDeletionRequest);
    }

    public List<AccountDeletionRequest> findAll() {
        return accountDeletionRequestRepository.findAll();
    }
}
