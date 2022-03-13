package com.fishyfinds.isa.model.beans;

import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.enums.ComplaintStatus;
import lombok.Getter;
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

    @Column(name = "content")
    private String content;

    @Column(name="status")
    private ComplaintStatus status;

    @OneToOne
    @JoinColumn(name="customer", referencedColumnName = "id")
    private User user;

    @OneToOne
    @JoinColumn(name="offer", referencedColumnName = "id")
    private Offer offer;

}
