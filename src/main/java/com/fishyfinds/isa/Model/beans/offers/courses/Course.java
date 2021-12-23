package com.fishyfinds.isa.Model.beans.offers.courses;

import com.fishyfinds.isa.Model.beans.offers.Offer;
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

	@Column(name = "fishingTools", nullable = false)
	private String fishingTools;

	
}
