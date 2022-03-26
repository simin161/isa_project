package com.fishyfinds.isa.service;

import com.fishyfinds.isa.model.beans.AccountDeletionRequest;
import com.fishyfinds.isa.model.enums.DeletionRequestStatus;
import com.fishyfinds.isa.repository.AccountDeletionRequestRepository;
import com.fishyfinds.isa.repository.usersRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountDeletionRequestService {

    @Autowired
    private AccountDeletionRequestRepository accountDeletionRequestRepository;
    @Autowired
    private UserRepository userRepository;

    public boolean add(String username, AccountDeletionRequest accountDeletionRequest){
        accountDeletionRequest.setUser(userRepository.findByEmail(username));
        AccountDeletionRequest accountDeletionRequestFromDB = accountDeletionRequestRepository.findByUser(accountDeletionRequest.getUser());
        if(accountDeletionRequestFromDB != null){
            if(checkIfStatusIsDeclined(accountDeletionRequestFromDB.getStatus())){
                updateRequestStatus(accountDeletionRequestFromDB);
                return true;
            }
            return false;
        }
        accountDeletionRequest.setStatus(DeletionRequestStatus.PENDING);
        accountDeletionRequestRepository.save(accountDeletionRequest);
        return true;
    }

    private boolean checkIfStatusIsDeclined(DeletionRequestStatus status){
        return status == DeletionRequestStatus.DECLINED;
    }

    private void updateRequestStatus(AccountDeletionRequest accountDeletionRequest){
        accountDeletionRequest.setStatus(DeletionRequestStatus.PENDING);
        accountDeletionRequestRepository.save(accountDeletionRequest);
    }

    public List<AccountDeletionRequest> findAllPending() {
        List<AccountDeletionRequest> allPendingRequests= accountDeletionRequestRepository.findAll();
        for(AccountDeletionRequest a : accountDeletionRequestRepository.findAll()){
            if(a.getStatus()==DeletionRequestStatus.PENDING){
                allPendingRequests.add(a);
            }
        }
        return allPendingRequests;
    }

    public boolean updateRequest(Long id){

        AccountDeletionRequest request = accountDeletionRequestRepository.findById(id).orElse(null);
        if(request == null){
            return false;
        }else{
            request.setStatus(DeletionRequestStatus.ACCEPTED);
            accountDeletionRequestRepository.save(request);
            return true;
        }
    }
}
