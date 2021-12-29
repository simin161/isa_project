package com.fishyfinds.isa.repository.usersRepository;

import com.fishyfinds.isa.model.beans.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository  extends JpaRepository<User, Long> {
    public User findByEmail(String email);
}
