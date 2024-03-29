package com.fishyfinds.isa.service;

import com.fishyfinds.isa.model.beans.terms.Reservation;
import com.fishyfinds.isa.model.beans.users.User;
import com.fishyfinds.isa.model.beans.users.customers.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;
    private final String fromAddress = "dislinkt_team_23@yahoo.com";

    public void sendVerificationEmail(Customer user, String siteURL)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
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
        String verifyURL = siteURL + "/api/verifyCustomerAccount?code=" + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);

    }

    public void sendDeleteReasonEmail(User user, String reasoning)
        throws MessagingException, UnsupportedEncodingException {

        String toAddress= user.getEmail();
        String senderName= "Fishy Finds";
        String subject = "Your request for account deletion has been denied.";
        String content = "Dear [[name]],<br>"
                + "After reviewing your request we have determined that it can not be resolved due to the following:<br>"
                + reasoning + "<br>"
                + "Best regards,<br>"
                + "Fishy Finds.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFirstName());

        helper.setText(content, true);

        mailSender.send(message);

    }

    public void sendCreationApprovalMail(String email) {
    }

    public void sendCreationDenyReasonEmail(User user, String explanation) {
    }

    public void sendSuccessfulReservationEmail(Customer user, Reservation reservation)
            throws MessagingException, UnsupportedEncodingException {

        String toAddress= user.getEmail();
        String senderName= "Fishy Finds";
        String subject = "Your reservation is successful.";
        double discount = user.getLoyaltyProgram() != null ? user.getLoyaltyProgram().getCategoryDiscount() : 0;
        String content = "Dear [[name]],<br>"
                + "You made reservation for:<br>"
                + reservation.getOffer().getOfferName() + "<br>"
                + "Starting: " + reservation.getStartDate() + "<br>"
                + "Ending: " + reservation.getEndDate() + "<br>"
                + "Total price: " + reservation.getTotalPrice() + "<br>"
                + "Discount: " + discount + "% <br>"
                + "Fishy Finds.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFirstName());

        helper.setText(content, true);

        mailSender.send(message);

    }
}
