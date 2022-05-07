package com.fishyfinds.isa.model.beans.terms.boats;

import com.fishyfinds.isa.model.beans.terms.bungalows.BungalowQuickReservation;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.model.enums.StatusOfReservation;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name="PreviousBoatReservation")
public class PreviousBoatQuickReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch= FetchType.EAGER)
    @JoinColumn(name = "customerId", referencedColumnName = "id")
    private Customer customer;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "boatQuickReservationId", referencedColumnName = "id")
    private BoatQuickReservation boatQuickReservation;

    @Enumerated(EnumType.STRING)
    @Column(name="statusOfReservation")
    private StatusOfReservation statusOfReservation;

    public PreviousBoatQuickReservation() {}

    public PreviousBoatQuickReservation(Long id, Customer customer, BoatQuickReservation boatQuickReservation, StatusOfReservation statusOfReservation) {
        this.id = id;
        this.customer = customer;
        this.boatQuickReservation = boatQuickReservation;
        this.statusOfReservation = statusOfReservation;
    }


}
