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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bungalowId", referencedColumnName = "id")
    private Bungalow bungalow;

    @Column(name="startTime")
    private LocalDateTime startTime;

    @Column(name="endTime")
    private LocalDateTime endTime;

    public BungalowTerm() {}

    public BungalowTerm(Long id, Bungalow bungalow, LocalDateTime startTime, LocalDateTime endTime) {
        this.id = id;
        this.bungalow = bungalow;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}




