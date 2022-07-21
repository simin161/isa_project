package com.fishyfinds.isa.model.beans.terms;

import com.fishyfinds.isa.model.beans.offers.Offer;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "Term")
public class Term {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	//@SequenceGenerator(name="mySeqGen_Term", sequenceName = "mySeq_Term", initialValue = 5, allocationSize = 1)
	//@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mySeqGen_Term")
	private Long id;

	@OneToOne
	@JoinColumn(name="offer", referencedColumnName = "id")
	private Offer offer;

	@Column(name = "startDate")
	private LocalDateTime startDate;

	@Column(name = "endDate")
	private LocalDateTime endDate;

	@OneToMany(mappedBy="id", cascade = CascadeType.ALL)
	@Column(name = "reservations")
	private List<Reservation> reservations;

	public Term() {	}

	public Term(Offer offer, LocalDateTime startDate, LocalDateTime endDate) {
		this.offer = offer;
		this.startDate = startDate;
		this.endDate = endDate;
	}
}
