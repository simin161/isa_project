package com.fishyfinds.isa.repository.usersRepository;
import com.fishyfinds.isa.model.beans.users.owners.BoatOwner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoatOwnerRepostory extends JpaRepository<BoatOwner, Long> {

    public BoatOwner findByEmail(String email);
}
