package com.fishyfinds.isa.model.beans.offers;

import com.fishyfinds.isa.model.enums.AdditionalServiceType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CollectionId;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "AdditionalService")
@SequenceGenerator(name = "sequence", sequenceName = "mySequence")
public class AdditionalService{

    @Id
    @GenericGenerator(name = "seq", strategy="increment")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seq")
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

    @Override
    public String toString() {
        return "AdditionalService{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type=" + type +
                '}';
    }
}
