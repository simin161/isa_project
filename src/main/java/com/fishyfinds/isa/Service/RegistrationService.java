package com.fishyfinds.isa.Service;

import com.fishyfinds.isa.Model.beans.users.customers.Customer;
import com.fishyfinds.isa.Repository.CustomerRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Service
public class RegistrationService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private JavaMailSender mailSender;
    public boolean registerCustomer(Customer customer, String siteURL){
        boolean retVal = true;
        if(!checkIfEmailExists(customer.getEmail())){
            setCustomerVerificationCode(RandomString.make(64), customer);
            try {
                sendVerificationEmail(customer, siteURL);
            } catch (Exception e) {
                retVal = false;
            }
        }
        return retVal;
    }

    private boolean checkIfEmailExists(String email){
        return customerRepository.findByEmail(email) != null;
    }

    private void sendVerificationEmail(Customer user, String siteURL)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "findsfishy@gmail.com";
        String senderName = "Fishy Finds";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Fishy Finds.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFirstName());
        String verifyURL = siteURL + "/api/verify?code=" + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);

    }

    public boolean verify(String verificationCode) {
        Customer user = customerRepository.findByVerificationCode(verificationCode);
        return (user == null || user.isActivated()) ? false : activateCustomerAccount(user);
    }

    private boolean activateCustomerAccount(Customer customer){
        customer.setActivated(true);
        setCustomerVerificationCode("", customer);
        return true;
    }

    private void setCustomerVerificationCode(String code, Customer customer){
        customer.setVerificationCode(code);
        customerRepository.save(customer);
    }
}
