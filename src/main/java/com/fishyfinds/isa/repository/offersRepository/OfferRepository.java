package com.fishyfinds.isa.repository.offersRepository;

import com.fishyfinds.isa.model.beans.offers.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OfferRepository extends JpaRepository<Offer, Long> {
}
