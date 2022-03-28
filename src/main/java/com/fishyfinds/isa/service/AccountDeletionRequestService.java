package com.fishyfinds.isa.service;

import com.fishyfinds.isa.model.beans.AccountDeletionRequest;
import com.fishyfinds.isa.model.beans.ResolveDeletionRequest;
import com.fishyfinds.isa.model.enums.DeletionRequestStatus;
import com.fishyfinds.isa.repository.AccountDeletionRequestRepository;
import com.fishyfinds.isa.repository.usersRepository.UserRepository;
import com.fishyfinds.isa.service.usersService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AccountDeletionRequestService {

    @Autowired
    private AccountDeletionRequestRepository accountDeletionRequestRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private MailService mailService;

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
        List<AccountDeletionRequest> allPendingRequests= new ArrayList<AccountDeletionRequest>();
        for(AccountDeletionRequest a : accountDeletionRequestRepository.findAll()){
            if(a.getStatus()==DeletionRequestStatus.PENDING){
                allPendingRequests.add(a);
            }
        }
        return allPendingRequests;
    }

    public boolean updateRequest(ResolveDeletionRequest deletionRequest){

        userService.deleteUser(deletionRequest.getUser().getId());

        AccountDeletionRequest request = accountDeletionRequestRepository.findById(deletionRequest.getRequestId()).orElse(null);
        if(request == null){
            return false;
        }else{
            request.setStatus(DeletionRequestStatus.ACCEPTED);
            accountDeletionRequestRepository.save(request);
            return true;
        }
    }

    public boolean denyDeleteRequest(ResolveDeletionRequest deletionRequest) throws MessagingException, UnsupportedEncodingException {

        AccountDeletionRequest request = accountDeletionRequestRepository.findById(deletionRequest.getRequestId()).orElse(null);
        if(request == null){
            return false;
        }else {
            request.setStatus(DeletionRequestStatus.DECLINED);
            accountDeletionRequestRepository.save(request);
            mailService.sendDeleteReasonEmail(userService.findUser(request.getUser().getId()), deletionRequest.getExplanation());
            return true;
        }
    }
}
