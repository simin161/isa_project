package com.fishyfinds.isa.service;

import com.fishyfinds.isa.model.beans.Complaint;
import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.enums.ComplaintStatus;
import com.fishyfinds.isa.repository.ComplaintRepository;
import com.fishyfinds.isa.repository.offersRepository.OfferRepository;
import com.fishyfinds.isa.repository.usersRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComplaintService {

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    public boolean add(String username, String content, String offerID) {
        User user = userRepository.findByEmail(username);
        Offer offer = offerRepository.findById(Long.parseLong(offerID)).orElseGet(null);
        Complaint complaint = new Complaint(Long.valueOf(complaintRepository.findAll().size() + 1), content, ComplaintStatus.PENDING,user, offer);
        complaintRepository.save(complaint);

        return true;
    }
}
