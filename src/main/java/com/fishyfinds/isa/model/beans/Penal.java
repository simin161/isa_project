package com.fishyfinds.isa.model.beans;

import com.fishyfinds.isa.model.beans.users.customers.Customer;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="penal")
public class Penal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    @OneToOne
    @JoinColumn(name="customer", referencedColumnName = "id")
    private Customer customer;
    @Column(name="number")
    private int number;

}
