package com.fishyfinds.isa.Model.beans.users;


import com.fishyfinds.isa.Model.beans.LoyaltyProgram;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Admin")
@PrimaryKeyJoinColumn(name = "id")
public class Admin extends User {

	@Column(name = "earningPercentage")
	private double earningPercentage;

}
