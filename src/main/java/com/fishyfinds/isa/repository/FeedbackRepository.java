package com.fishyfinds.isa.repository;

import com.fishyfinds.isa.model.beans.UserFeedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<UserFeedback, Integer> {
}
