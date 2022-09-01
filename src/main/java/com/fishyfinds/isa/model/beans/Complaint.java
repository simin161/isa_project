package com.fishyfinds.isa.model.beans;

import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.terms.Reservation;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.enums.ComplaintStatus;
import com.fishyfinds.isa.model.enums.ComplaintType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Complaint")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="status")
    private ComplaintStatus status;

    @Column(name="complaintType")
    private ComplaintType complaintType;

    @Column(name="content")
    private String content;

    @ManyToOne
    @JoinColumn(name="reservation", referencedColumnName = "id")
    private Reservation reservation;

    public Complaint(){}
    public Complaint(ComplaintStatus status, String content, Reservation reservation, ComplaintType complaintType) {
        this.status = status;
        this.content = content;
        this.reservation = reservation;
        this.complaintType = complaintType;
    }


}
