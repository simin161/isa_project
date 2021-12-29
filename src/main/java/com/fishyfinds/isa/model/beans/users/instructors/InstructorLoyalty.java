package com.fishyfinds.isa.model.beans.users.instructors;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Instructor_Loyalty")
public class InstructorLoyalty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="instructorId", nullable = false, insertable = false, updatable = false)
    private int instructorId;

    @Column(name="loyaltyId", nullable = false, insertable = false, updatable = false)
    private int loyaltyId;

}
