package com.fishyfinds.isa.model.beans.terms.bungalows;

import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.model.enums.StatusOfReservation;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="PreviousBungalowQuickReservation")
public class PreviousBungalowQuickReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "customerId", referencedColumnName = "id")
    private Customer customer;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "bungalowQuickReservationId", referencedColumnName = "id")
    private BungalowQuickReservation bungalowQuickReservation;

    @Enumerated(EnumType.STRING)
    @Column(name="statusOfReservation")
    private StatusOfReservation statusOfReservation;

    public PreviousBungalowQuickReservation() {}

    public PreviousBungalowQuickReservation(Long id, Customer customer, BungalowQuickReservation bungalowQuickReservation, StatusOfReservation statusOfReservation) {
        this.id = id;
        this.customer = customer;
        this.bungalowQuickReservation = bungalowQuickReservation;
        this.statusOfReservation = statusOfReservation;
    }
}




