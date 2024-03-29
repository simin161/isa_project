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
                updateRequest(accountDeletionRequestFromDB, accountDeletionRequest.getExplanation());
                return true;
            }
        }
        accountDeletionRequest.setStatus(DeletionRequestStatus.PENDING);
        accountDeletionRequestRepository.save(accountDeletionRequest);
        return true;
    }

    private boolean checkIfStatusIsDeclined(DeletionRequestStatus status){
        return status == DeletionRequestStatus.DECLINED;
    }

    private void updateRequest(AccountDeletionRequest accountDeletionRequest, String explanation){
        accountDeletionRequest.setStatus(DeletionRequestStatus.PENDING);
        accountDeletionRequest.setExplanation(explanation);
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

    public boolean addCreationRequest(String email, String reasoning) {
        try {
            AccountDeletionRequest accountDeletionRequest = new AccountDeletionRequest();
            accountDeletionRequest.setUser(userRepository.findByEmail(email));
            accountDeletionRequest.setStatus(DeletionRequestStatus.PENDING_CREATION);
            accountDeletionRequestRepository.save(accountDeletionRequest);
            return true;
        }catch(Exception e){
            return false;
        }
    }

    public List<AccountDeletionRequest> findAllCreationPending() {
        List<AccountDeletionRequest> allPendingRequests= new ArrayList<AccountDeletionRequest>();
        for(AccountDeletionRequest a : accountDeletionRequestRepository.findAll()){
            if(a.getStatus()==DeletionRequestStatus.PENDING_CREATION){
                allPendingRequests.add(a);
            }
        }
        return allPendingRequests;
    }

    public boolean approveCreationRequest(AccountDeletionRequest request) {
        AccountDeletionRequest req = accountDeletionRequestRepository.findById(request.getRequestId()).orElse(null);
        if(request == null){
            return false;
        }else{
            userService.activateUser(request.getUser().getId());
            mailService.sendCreationApprovalMail(userService.findUser(request.getUser().getId()).getEmail());
            request.setStatus(DeletionRequestStatus.ACCEPTED_CREATION);
            accountDeletionRequestRepository.save(request);
            return true;
        }
    }

    public boolean denyCreationRequest(ResolveDeletionRequest creationRequest) throws MessagingException, UnsupportedEncodingException {
        AccountDeletionRequest request = accountDeletionRequestRepository.findById(creationRequest.getRequestId()).orElse(null);
        if(request == null){
            return false;
        }else {
            request.setStatus(DeletionRequestStatus.DECLINED_CREATION);
            accountDeletionRequestRepository.save(request);
            mailService.sendCreationDenyReasonEmail(userService.findUser(request.getUser().getId()), creationRequest.getExplanation());
            return true;
        }
    }
}
