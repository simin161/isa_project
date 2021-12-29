package com.fishyfinds.isa.model.beans.users;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "Admin")
@PrimaryKeyJoinColumn(name = "id")
public class Admin extends User {

	@Column(name = "earningPercentage")
	private double earningPercentage;

}
