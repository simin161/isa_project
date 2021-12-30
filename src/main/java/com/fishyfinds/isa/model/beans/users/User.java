package com.fishyfinds.isa.model.beans.users;

import com.fishyfinds.isa.model.enums.UserType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;


@Entity
@Table(name = "Users")
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
@SequenceGenerator(name = "sequence", sequenceName = "mySequence")
public class User {

    @Id
    @GenericGenerator(name = "seq", strategy="increment")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seq")
    protected Long id;

    @Column(name = "firstName", nullable = false)
    protected String firstName;

    @Column(name = "lastName", nullable = false)
    protected String lastName;

    @Column(name = "password", nullable = false)
    protected String password;

    @Column(name = "email", nullable = false)
    protected String email;

    @Column(name = "country", nullable = false)
    protected String country;

    @Column(name = "city", nullable = false)
    protected String city;

    @Column(name = "address", nullable = false)
    protected String address;

    @Column(name = "phoneNumber", nullable = false)
    protected String phoneNumber;

    @Column(name = "isDeleted", nullable = false)
    protected boolean isDeleted;

    @Column(name="isActivated", nullable=false)
    protected boolean isActivated;

    @Column(name="verificationCode", nullable=false)
    protected String verificationCode;

    @Column(name="userType")
    protected UserType userType;

    public User() {}
    public User(Long id, String firstName, String lastName, String address, String city, String country, String phoneNumber, String email, String password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.country = country;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
    }

    public void update(User user){
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.address = user.address;
        this.city = user.city;
        this.country = user.country;
        this.phoneNumber = user.phoneNumber;
    }
}
