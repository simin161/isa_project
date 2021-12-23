package com.fishyfinds.isa.Model.beans;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "Term")
public class Term {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "start")
	private Date start;

	@Column(name = "duration")
	private int duration;

	@Column(name = "customerCapacity")
	private int customerCapacity;

	@Column(name = "isReserved")
	private boolean isReserved;
	
	
}
