package com.fishyfinds.isa.model.beans;

import com.fishyfinds.isa.model.beans.users.User;
import lombok.Generated;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Getter
@Setter
public class ResolveDeletionRequest {

    private Long requestId;
    private User user;
    private String explanation;

    public ResolveDeletionRequest(){}

    public ResolveDeletionRequest(Long requestId, Long userId, String explanation) {

        this.requestId = requestId;
        this.user = new User();
        this.user.setId(userId);
        this.explanation = explanation;

    }

}
