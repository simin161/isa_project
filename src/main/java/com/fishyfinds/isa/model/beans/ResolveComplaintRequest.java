package com.fishyfinds.isa.model.beans;

import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.users.User;

public class ResolveComplaintRequest {

    private Long complaintId;
    private User user;
    private Offer offer;
    private String content;

    public Long getComplaintId() {
        return complaintId;
    }

    public void setComplaintId(Long complaintId) {
        this.complaintId = complaintId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Offer getOffer() {
        return offer;
    }

    public void setOffer(Offer offer) {
        this.offer = offer;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public ResolveComplaintRequest(){

    }

    public ResolveComplaintRequest(Long complaintId, Long userId, String content, Long offerId){
        this.complaintId = complaintId;
        this.user = new User();
        this.user.setId(userId);
        this.offer = new Offer();
        this.offer.setId(offerId);
        this.content = content;
    }
}
