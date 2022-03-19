package com.fishyfinds.isa.service;

import com.fishyfinds.isa.mappers.DtoToUser;
import com.fishyfinds.isa.model.beans.users.Admin;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import com.fishyfinds.isa.model.beans.users.instructors.Instructor;
import com.fishyfinds.isa.model.beans.users.owners.BoatOwner;
import com.fishyfinds.isa.model.beans.users.owners.BungalowOwner;
import com.fishyfinds.isa.model.enums.UserType;
import com.fishyfinds.isa.repository.usersRepository.*;
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
    private BoatOwnerRepostory boatOwnerRepository;
    @Autowired
    private BungalowOwnerRepository bungalowOwnerRepository;
    @Autowired
    private InstructorRepository instructorRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MailService mailService;
    @Autowired
    private AdminRepository adminRepository;

    public boolean registerUser(Map<String, String> map, String siteURL){
        boolean successfullyRegistered = true;
        UserType userType = UserType.valueOf(map.get("userType"));
        switch (userType) {
            case CUSTOMER:
                successfullyRegistered = registerCustomer(DtoToUser.MapToCustomer(map), siteURL);
                break;
            case BUNGALOW_OWNER:
                successfullyRegistered = registerBungalowOwner(DtoToUser.MapToBungalowOwner(map), siteURL);
                break;
            case BOAT_OWNER:
                successfullyRegistered = registerBoatOwner(DtoToUser.MapToBoatOwner(map), siteURL);
                break;
            case INSTRUCTOR:
                successfullyRegistered = registerInstructor(DtoToUser.MapToInstructor(map), siteURL);
                break;
            case ADMIN:
                successfullyRegistered = registerAdmin(DtoToUser.MapToAdmin(map), siteURL);
                break;
        }
        return successfullyRegistered;
    }

    private boolean registerCustomer(Customer customer, String siteURL){
        boolean successfullyRegistered = true;
        if(!checkIfEmailExists(customer.getEmail())){
            customer.setUserType(UserType.CUSTOMER);
            customer.setNumberOfLogIns(0);
            setVerificationCode(RandomString.make(64), customer);
            try {
                customerRepository.save(customer);
                mailService.sendVerificationEmail(customer, siteURL);
            } catch (Exception e) {
                successfullyRegistered = false;
            }
        }
        return successfullyRegistered;
    }

    public boolean registerBungalowOwner(BungalowOwner owner, String siteURL){
        boolean successfullyRegistered = false;
        if(!checkIfEmailExists(owner.getEmail())){
            owner.setUserType(UserType.BUNGALOW_OWNER);
            owner.setNumberOfLogIns(0);
            activateAccount(owner);
            bungalowOwnerRepository.save(owner);
            successfullyRegistered = true;
        }
        return successfullyRegistered;
    }

    public boolean registerBoatOwner(BoatOwner owner, String siteURL){
        boolean successfullyRegistered = false;
        if(!checkIfEmailExists(owner.getEmail())){
            owner.setUserType(UserType.BOAT_OWNER);
            owner.setNumberOfLogIns(0);
            activateAccount(owner);
            boatOwnerRepository.save(owner);
            successfullyRegistered = true;
        }
        return successfullyRegistered;
    }

    public boolean registerInstructor(Instructor instructor, String siteURL){
        boolean successfullyRegistered = false;
        if(!checkIfEmailExists(instructor.getEmail())){
            instructor.setUserType(UserType.INSTRUCTOR);
            instructor.setNumberOfLogIns(0);
            activateAccount(instructor);
            instructorRepository.save(instructor);
            successfullyRegistered = true;
        }
        return successfullyRegistered;
    }

    public boolean registerAdmin(Admin admin, String siteURL){
        boolean successfullyRegistered = true;
        if(!checkIfEmailExists(admin.getEmail())){
            admin.setUserType(UserType.ADMIN);
            admin.setNumberOfLogIns(0);
            try {
                activateAccount(admin);
                adminRepository.save(admin);
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
        userRepository.save(user);
        return true;
    }

    private void setVerificationCode(String code, User user){
        user.setVerificationCode(code);
    }

}
