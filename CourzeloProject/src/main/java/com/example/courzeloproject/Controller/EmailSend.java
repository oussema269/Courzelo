package com.example.courzeloproject.Controller;

import com.example.courzeloproject.Entite.EmailRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin("*")
@RestController
public class EmailSend {
    @Autowired
    private JavaMailSender emailSender;
    @CrossOrigin("*")
    @PostMapping("/send-email")
    public String sendEmail(@RequestBody EmailRequest request) {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setTo(request.getEmail());
            helper.setSubject(request.getSubject());
            helper.setText(request.getCorp());
            emailSender.send(message);
            return "E-mail envoyé avec succès";
        } catch (MessagingException e) {
            e.printStackTrace();
            return "Erreur lors de l'envoi de l'e-mail";
        }
    }
}
