package com.fishyfinds.isa.service;

import com.fishyfinds.isa.model.beans.UserFeedback;
import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.terms.Reservation;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.enums.ComplaintStatus;
import com.fishyfinds.isa.repository.FeedbackRepository;
import com.fishyfinds.isa.repository.offersRepository.OfferRepository;
import com.fishyfinds.isa.repository.termsRepository.ReservationRepository;
import com.fishyfinds.isa.repository.usersRepository.CustomerRepository;
import com.fishyfinds.isa.repository.usersRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private MailService mailService;
    @Autowired
    private OfferRepository offerRepository;
    @Autowired
    private UserRepository userRepository;

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

    public boolean acceptFeedback(Map<String, String> message){
        try{
            UserFeedback feedback = feedbackRepository.findById(Integer.valueOf(message.get("feedbackId"))).orElse(null);
            if(feedback != null) {
                feedback.setStatus(ComplaintStatus.ACCEPTED);
                Reservation r = reservationRepository.getById(feedback.getReservation().getId());
                Offer o = offerRepository.getById(r.getOffer().getId());
                User owner = userRepository.findById(o.getUser().getId()).orElse(null);
                if(owner!= null){
                    feedbackRepository.save(feedback);
                    mailService.sendFeedbackAcceptMail(owner, feedback);
                    return true;
                }else{
                    return false;
                }

            }else{
                return false;
            }
        }catch (Exception e){
            System.out.println(e.toString());
            return false;
        }
    }

    public boolean denyFeedback(Map<String, String> message){
        try{
            UserFeedback feedback = feedbackRepository.findById(Integer.valueOf(message.get("feedbackId"))).orElse(null);
            if(feedback!=null){
                feedback.setStatus(ComplaintStatus.DECLINED);
                feedbackRepository.save(feedback);
                return true;
            }else{
                return false;
            }
        }catch (Exception e){
            System.out.println(e.toString());
            return false;
        }
    }
}
