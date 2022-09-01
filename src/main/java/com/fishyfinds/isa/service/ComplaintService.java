package com.fishyfinds.isa.service;

import com.fishyfinds.isa.model.beans.Complaint;
import com.fishyfinds.isa.model.beans.ResolveComplaintRequest;
import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.terms.Reservation;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.enums.ComplaintStatus;
import com.fishyfinds.isa.model.enums.ComplaintType;
import com.fishyfinds.isa.repository.ComplaintRepository;
import com.fishyfinds.isa.repository.offersRepository.OfferRepository;
import com.fishyfinds.isa.repository.termsRepository.ReservationRepository;
import com.fishyfinds.isa.repository.usersRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    public boolean add(String username, String content, String reservationId, String complaintType) {
        User user = userRepository.findByEmail(username);
        Reservation reservation = reservationRepository.findById(Long.parseLong(reservationId)).orElseGet(null);
        ComplaintType type = ComplaintType.OWNER_COMPLAINT;
        if(complaintType.equals("OFFER_COMPLAINT"))
            type= ComplaintType.OFFER_COMPLAINT;
        else if(complaintType.equals("BOTH_COMPLAINT"))
            type = ComplaintType.BOTH_COMPLAINT;
        Complaint complaint = new Complaint(ComplaintStatus.PENDING, content, reservation, type);
        complaintRepository.save(complaint);
        reservation.setHasComplaint(true);
        reservationRepository.save(reservation);
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
