package com.fishyfinds.isa.model.beans.offers;

import com.fishyfinds.isa.model.beans.users.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "ImageItem")
public class ImageItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //    @SequenceGenerator(name="mySeqGen_Image", sequenceName = "mySeq_Image", initialValue = 2, allocationSize = 1)
    //    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mySeqGen_Image")
    private Long id;

    @OneToOne
    @JoinColumn(name="offerId", referencedColumnName = "id")
    protected Offer offer;

    @Column(name="isDeleted")
    protected boolean isDeleted = false;

    /*
        @Column(name = "filepath")
        private String filepath;

        @Column(name = "isDeleted")
        private boolean isDeleted = false;
    */
    public ImageItem() {
    }

    public ImageItem(Long id, Offer offer, boolean isDeleted) {
        this.id = id;
        this.offer = offer;
        this.isDeleted = isDeleted;
    }

}
