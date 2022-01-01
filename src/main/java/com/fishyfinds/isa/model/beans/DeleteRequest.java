package com.fishyfinds.isa.model.beans;

import com.fishyfinds.isa.model.beans.users.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="DeleteRequest")
public class DeleteRequest {

    @Id
    @GenericGenerator(name = "seq", strategy="increment")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seq")
    private Long id;

    @OneToOne
    @JoinColumn(name="users", referencedColumnName = "id")
    private User user;

    @Column(name="explanation")
    private String explanation;

    public DeleteRequest() {}

    public DeleteRequest(Long userId, String explanation){
        this.user = new User();
        this.user.setId(userId);
        this.explanation = explanation;
    }
}
