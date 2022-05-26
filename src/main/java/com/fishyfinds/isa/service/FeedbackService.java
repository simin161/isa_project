package com.fishyfinds.isa.service;

import com.fishyfinds.isa.model.beans.UserFeedback;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.enums.ComplaintStatus;
import com.fishyfinds.isa.repository.FeedbackRepository;
import com.fishyfinds.isa.repository.usersRepository.CustomerRepository;
import com.fishyfinds.isa.repository.usersRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private CustomerRepository customerRepository;

    public boolean addFeedback(String username, UserFeedback feedback){

        feedback.setCustomer(customerRepository.findByEmail(username));
        feedback.setStatus(ComplaintStatus.PENDING);
        feedbackRepository.save(feedback);

        return true;
    }

    public List<UserFeedback> findAllPending() {
        List<UserFeedback> allPendingFeedbacks = new ArrayList<>();
        for(UserFeedback f : feedbackRepository.findAll()){
            if(f.getStatus()==ComplaintStatus.PENDING){
                allPendingFeedbacks.add(f);
            }
        }
        return allPendingFeedbacks;
    }

    public List<UserFeedback> findAllAcceptedFeedbacks() {
        List<UserFeedback> allAcceptedFeedbacks = new ArrayList<>();
        for(UserFeedback f : feedbackRepository.findAll()){
            if(f.getStatus()==ComplaintStatus.ACCEPTED){
                allAcceptedFeedbacks.add(f);
            }
        }
        return allAcceptedFeedbacks;
    }
}
