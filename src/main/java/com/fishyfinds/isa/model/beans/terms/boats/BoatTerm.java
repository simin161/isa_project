package com.fishyfinds.isa.model.beans.terms.boats;

import com.fishyfinds.isa.model.beans.offers.boats.Boat;
import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name="BoatTerm")
public class BoatTerm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "boatId", referencedColumnName = "id")
    private Boat boat;

    @Column(name="startTime", nullable = false)
    private LocalDateTime startTime;

    @Column(name="endTime", nullable = false)
    private LocalDateTime endTime;

    public BoatTerm() {}

    public BoatTerm(Long id, Boat boat, LocalDateTime startTime, LocalDateTime endTime) {
        this.id = id;
        this.boat = boat;
        this.startTime = startTime;
        this.endTime = endTime;
    }

}
