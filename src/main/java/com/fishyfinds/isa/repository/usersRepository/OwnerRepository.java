package com.fishyfinds.isa.repository.usersRepository;

import com.fishyfinds.isa.model.beans.users.owners.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerRepository extends JpaRepository<Owner, Long> {

    public Owner findByEmail(String email);

    public Owner findByVerificationCode(String verificationCode);


}
