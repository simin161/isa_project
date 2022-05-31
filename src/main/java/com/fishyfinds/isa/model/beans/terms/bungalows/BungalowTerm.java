package com.fishyfinds.isa.model.beans.terms.bungalows;

import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table(name="BungalowTerm")
public class BungalowTerm {

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name="mySeqGen_BungalowTerm", sequenceName = "mySeq_BungalowTerm", initialValue = 5, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mySeqGen_BungalowTerm")
    private Long id;

    @ManyToOne//(fetch = FetchType.LAZY)
    @JoinColumn(name = "bungalowId", referencedColumnName = "id")
    private Bungalow bungalow;

    @Column(name="startTime")
    private LocalDateTime startTime;

    @Column(name="endTime")
    private LocalDateTime endTime;

    public BungalowTerm() {}

    public BungalowTerm(Bungalow bungalow, LocalDateTime startTime, LocalDateTime endTime) {
        this.bungalow = bungalow;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}




