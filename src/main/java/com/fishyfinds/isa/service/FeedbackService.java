package com.fishyfinds.isa.service;

import com.fishyfinds.isa.model.beans.UserFeedback;
import com.fishyfinds.isa.model.beans.terms.Reservation;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.enums.ComplaintStatus;
import com.fishyfinds.isa.repository.FeedbackRepository;
import com.fishyfinds.isa.repository.termsRepository.ReservationRepository;
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
    private ReservationRepository reservationRepository;

    public boolean addFeedback(String username, UserFeedback feedback){
        Reservation r = reservationRepository.findById(feedback.getReservation().getId()).orElse(null);
        r.setHasFeedback(true);
        feedback.setStatus(ComplaintStatus.PENDING);
        feedbackRepository.save(feedback);
        reservationRepository.save(r);
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
