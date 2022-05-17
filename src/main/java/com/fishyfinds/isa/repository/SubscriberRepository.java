package com.fishyfinds.isa.repository;

import com.fishyfinds.isa.model.beans.Subscriber;
import com.fishyfinds.isa.model.beans.offers.Offer;
import com.fishyfinds.isa.model.beans.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubscriberRepository extends JpaRepository<Subscriber, Long> {

    List<Subscriber> findAllByFollower(User user);
    List<Subscriber> findAllByFollowing(Offer offer);
}
