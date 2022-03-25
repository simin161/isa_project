package com.fishyfinds.isa.model.beans;

import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.enums.DeletionRequestStatus;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="DeleteRequest")
public class AccountDeletionRequest {

    @Id
    @GenericGenerator(name = "seq", strategy="increment")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seq")
    private Long id;

    @OneToOne
    @JoinColumn(name="users", referencedColumnName = "id")
    private User user;

    @Column(name="explanation")
    private String explanation;

    @Column(name="status")
    private DeletionRequestStatus status;

    public AccountDeletionRequest() {}

    public AccountDeletionRequest(Long userId, String explanation){
        this.user = new User();
        this.user.setId(userId);
        this.explanation = explanation;
    }
}
