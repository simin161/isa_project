package com.fishyfinds.isa.repository;

import com.fishyfinds.isa.model.beans.Subscriber;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriberRepository extends JpaRepository<Subscriber, Long> {
}
