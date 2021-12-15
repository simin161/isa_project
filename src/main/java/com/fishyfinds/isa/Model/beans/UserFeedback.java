package com.fishyfinds.isa.Model.beans;

import com.fishyfinds.isa.Model.enums.TargetType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "UserFeedback")
public class UserFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "content")
    private String content;

    @Column(name = "authorId")
    private int authorId;

    @Column(name = "targetId")
    private int targetId;

    @Column(name = "targetType")
    private TargetType targetType;

}
