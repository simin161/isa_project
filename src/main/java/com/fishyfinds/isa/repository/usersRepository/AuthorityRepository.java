package com.fishyfinds.isa.repository.usersRepository;

import com.fishyfinds.isa.model.beans.users.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Authority findByName(String name);
}
