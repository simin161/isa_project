package com.fishyfinds.isa.model.beans.terms;

import com.fishyfinds.isa.model.beans.offers.Offer;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "Term")
@SequenceGenerator(name = "sequence", sequenceName = "mySequence")
public class Term {

	@Id
	@GenericGenerator(name = "seq", strategy="increment")
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "seq")
	private Long id;

	@OneToOne
	@JoinColumn(name="offer", referencedColumnName = "id")
	private Offer offer;

	@Column(name = "startDate")
	private LocalDateTime startDate;

	@Column(name = "endDate")
	private LocalDateTime endDate;

	@OneToMany
	@JoinColumn(name="reservation", referencedColumnName = "id")
	private List<Reservation> reservations;

	public Term() {	}

	public Term(Offer offer, LocalDateTime startDate, LocalDateTime endDate) {
		this.offer = offer;
		this.startDate = startDate;
		this.endDate = endDate;
	}
}
