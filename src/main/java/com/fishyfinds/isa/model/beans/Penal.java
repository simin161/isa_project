package com.fishyfinds.isa.model.beans;

import com.fishyfinds.isa.model.beans.users.customers.Customer;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="penal")
@SequenceGenerator(name = "sequence", sequenceName = "mySequence")
public class Penal {
    @Id
    @GenericGenerator(name = "seq", strategy="increment")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seq")
    private Long id;
    @OneToOne
    @JoinColumn(name="customer", referencedColumnName = "id")
    private Customer customer;
    @Column(name="number")
    private int number;

}
