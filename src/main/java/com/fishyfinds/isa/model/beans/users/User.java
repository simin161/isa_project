package com.fishyfinds.isa.model.beans.users;

import com.fishyfinds.isa.model.enums.UserType;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;


@Entity
@Table(name = "users")
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
@SequenceGenerator(name = "sequence", sequenceName = "mySequence")
public class User implements UserDetails {

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

    @Column(name = "last_password_reset_date")
    private Timestamp lastPasswordResetDate;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_authority",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "authority_id", referencedColumnName = "id"))
    private List<Authority> authorities;

    @Column(name = "numberOfLogIns")
    private int numberOfLogIns;

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
        this.numberOfLogIns = 0;
    }

    public void update(User user){
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.address = user.address;
        this.city = user.city;
        this.country = user.country;
        this.phoneNumber = user.phoneNumber;
        this.numberOfLogIns = user.numberOfLogIns;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return isActivated;
    }
}
