package com.fishyfinds.isa.model.beans.users.customers;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Customer_Loyalty")
public class CustomerLoyalty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="customerId", nullable = false, insertable = false, updatable = false)
    private int customerId;

    @Column(name="loyaltyId", nullable = false, insertable = false, updatable = false)
    private int loyaltyId;

}
