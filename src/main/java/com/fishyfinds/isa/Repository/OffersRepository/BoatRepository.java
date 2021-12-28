package com.fishyfinds.isa.Repository.OffersRepository;
import com.fishyfinds.isa.Model.beans.offers.boats.Boat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoatRepository extends JpaRepository<Boat, Long> {

}
