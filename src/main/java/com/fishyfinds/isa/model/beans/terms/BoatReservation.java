package com.fishyfinds.isa.model.beans.terms;

import com.fishyfinds.isa.model.beans.users.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

//@Entity
//@Getter
//@Setter
//@Table(name="BoatReservation")
//@PrimaryKeyJoinColumn(name = "id")
public class BoatReservation/* extends Reservation*/{

  	//@OneToOne
	//@JoinColumn(name="captain", referencedColumnName = "id")
    private User captain;

}
