package com.fishyfinds.isa.service;

import com.fishyfinds.isa.mappers.DtoToUser;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.model.beans.users.owners.Owner;
import com.fishyfinds.isa.model.enums.UserType;
import com.fishyfinds.isa.repository.usersRepository.CustomerRepository;
import com.fishyfinds.isa.repository.usersRepository.InstructorRepository;
import com.fishyfinds.isa.repository.usersRepository.OwnerRepository;
import com.fishyfinds.isa.repository.usersRepository.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Map;

@Service
public class RegistrationService {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private OwnerRepository ownerRepository;
    @Autowired
    private InstructorRepository instructorRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MailService mailService;

    public boolean registerUser(Map<String, String> map, String siteURL){
        boolean successfullyRegistered = true;
        UserType userType = UserType.valueOf(map.get("userType"));
        switch (userType) {
            case CUSTOMER:
                successfullyRegistered = registerCustomer(DtoToUser.MapToCustomer(map), siteURL);
                break;
            case OWNER:
                successfullyRegistered = registerOwner(DtoToUser.MapToOwner(map), siteURL);
                break;
            case INSTRUCTOR:
                System.out.println("Wednesday");
                break;
            case ADMIN:
                System.out.println("Wednesday");
                break;
        }
        return successfullyRegistered;
    }

    private boolean registerCustomer(Customer customer, String siteURL){
        boolean successfullyRegistered = true;
        if(!checkIfEmailExists(customer.getEmail())){
            customer.setUserType(UserType.CUSTOMER);
            setVerificationCode(RandomString.make(64), customer);
            try {
                mailService.sendVerificationEmail(customer, siteURL);
            } catch (Exception e) {
                successfullyRegistered = false;
            }
        }
        return successfullyRegistered;
    }

    public boolean registerOwner(Owner owner, String siteURL){
        boolean successfullyRegistered = true;
        if(!checkIfEmailExists(owner.getEmail())){
            owner.setUserType(UserType.OWNER);
            try {
                mailService.sendRegistrationRequest(owner, siteURL);
            } catch (Exception e) {
                successfullyRegistered = false;
            }
        }
        return successfullyRegistered;
    }

    private boolean checkIfEmailExists(String email){
        return userRepository.findByEmail(email) != null;
    }


    public boolean verifyCustomerAccount(String verificationCode) {
        Customer user = customerRepository.findByVerificationCode(verificationCode);
        return (user == null || user.isActivated()) ? false : activateAccount(user);
    }

    private boolean activateAccount(User user){
        user.setActivated(true);
        setVerificationCode("", user);
        return true;
    }

    private void setVerificationCode(String code, User user){
        user.setVerificationCode(code);
        userRepository.save(user);
    }

}
