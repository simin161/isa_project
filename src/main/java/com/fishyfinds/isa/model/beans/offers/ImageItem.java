package com.fishyfinds.isa.model.beans.offers;

import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.beans.users.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table
public class ImageItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //    @SequenceGenerator(name="mySeqGen_Image", sequenceName = "mySeq_Image", initialValue = 2, allocationSize = 1)
    //    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mySeqGen_Image")
    private Long id;

    @Column(name="name")
    protected String name;

    @Column(name="filepath")
    protected String path;

    @Column(name="isDeleted")
    protected boolean isDeleted = false;

    public ImageItem() {}
    public ImageItem(String name, String path, boolean isDeleted) {
        this.name = name;
        this.path = path;
        this.isDeleted = isDeleted;
    }
}
