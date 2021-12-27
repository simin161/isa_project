package com.fishyfinds.isa.Repository;

import com.fishyfinds.isa.Model.beans.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository  extends JpaRepository<User, Long> {
    public User findByEmail(String email);
}
