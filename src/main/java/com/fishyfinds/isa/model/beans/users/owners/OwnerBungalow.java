package com.fishyfinds.isa.model.beans.users.owners;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

// TODO: DELETE THIS: OwnerBungalow (relation_owner_bungalow table)
/*
@Entity
@Getter
@Setter
@Table(name = "RelationOwnerBungalow")
public class OwnerBungalow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="ownerId", nullable = false, insertable = false, updatable = false)
    private int ownerId;

    @Column(name="bungalowId", nullable = false, insertable = false, updatable = false)
    private int bungalowId;

}
*/