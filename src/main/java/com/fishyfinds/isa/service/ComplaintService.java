package com.fishyfinds.isa.service;

import com.fishyfinds.isa.model.beans.Complaint;
import com.fishyfinds.isa.model.beans.ResolveComplaintRequest;
import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.enums.ComplaintStatus;
import com.fishyfinds.isa.repository.ComplaintRepository;
import com.fishyfinds.isa.repository.offersRepository.OfferRepository;
import com.fishyfinds.isa.repository.usersRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public List<Complaint> findAllPending() {
        List<Complaint> allPendingComplaints = new ArrayList<>();
        for(Complaint c : complaintRepository.findAll()){
            if(c.getStatus()==ComplaintStatus.PENDING){
                allPendingComplaints.add(c);
            }
        }
        return allPendingComplaints;
    }

    public List<Complaint> findAllAccepted() {
        List<Complaint> allAcceptedComplaints = new ArrayList<>();
        for(Complaint c : complaintRepository.findAll()){
            if(c.getStatus() == ComplaintStatus.ACCEPTED){
                allAcceptedComplaints.add(c);
            }
        }
        return allAcceptedComplaints;
    }

    public boolean acceptComplaint(ResolveComplaintRequest mapToResolveRequest) {

        Complaint c = complaintRepository.findById(mapToResolveRequest.getComplaintId().intValue()).orElse(null);
        if(c == null){
            return false;
        }else{
            c.setStatus(ComplaintStatus.ACCEPTED);
            complaintRepository.save(c);
            return true;
        }
    }


    public boolean denyComplaint(ResolveComplaintRequest mapToResolveRequest) {

        Complaint c = complaintRepository.findById(mapToResolveRequest.getComplaintId().intValue()).orElse(null);
        if(c==null){
            return false;
        }else{
            c.setStatus(ComplaintStatus.DECLINED);
            complaintRepository.save(c);
            return true;
        }

    }
}
