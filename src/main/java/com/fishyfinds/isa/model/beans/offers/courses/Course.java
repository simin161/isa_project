package com.fishyfinds.isa.model.beans.offers.courses;

import com.fishyfinds.isa.model.beans.offers.Offer;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "Course")
@PrimaryKeyJoinColumn(name = "id")
public class Course extends Offer {

	
}
