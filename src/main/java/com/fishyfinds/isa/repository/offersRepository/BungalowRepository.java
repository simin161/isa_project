package com.fishyfinds.isa.repository.offersRepository;

import com.fishyfinds.isa.model.beans.offers.bungalows.Bungalow;
import com.fishyfinds.isa.model.beans.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BungalowRepository extends JpaRepository<Bungalow, Long> {


}
