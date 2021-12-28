package com.fishyfinds.isa.Repository.OffersRepository;

import com.fishyfinds.isa.Model.beans.offers.bungalows.Bungalow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BungalowRepository extends JpaRepository<Bungalow, Long> {
}
