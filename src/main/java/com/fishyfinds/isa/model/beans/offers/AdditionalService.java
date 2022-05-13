package com.fishyfinds.isa.model.beans.offers;

import com.fishyfinds.isa.model.enums.AdditionalServiceType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CollectionId;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class AdditionalService{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name="type")
    private AdditionalServiceType type;

    public AdditionalService() { }

    public AdditionalService(Long id, String name, AdditionalServiceType type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

}
