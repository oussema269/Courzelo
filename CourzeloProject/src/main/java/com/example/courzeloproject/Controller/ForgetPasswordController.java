package com.example.courzeloproject.Controller;

import com.example.courzeloproject.Entite.User;
import com.example.courzeloproject.Repository.UserRepo;
import com.example.courzeloproject.Service.EmailSender;
import com.example.courzeloproject.Service.UserServiceImpl;
import com.example.courzeloproject.dto.MailDto;
import com.example.courzeloproject.payload.request.RequestChangePassword;
import com.example.courzeloproject.validators.ApiResponse;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/auth")
public class ForgetPasswordController {
    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private UserRepo userRepository;

    @Value("${services.reset-password")
    private String resetPassword;
    @Autowired
    private EmailSender emailSender ;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;


    @PostMapping("/forgot_password")
    public ResponseEntity<ApiResponse> processForgotPassword(@RequestBody User user) {
        String token = RandomStringUtils.randomAlphabetic(8);
        String email = user.getEmail();
        userService.resetPassword(token, email);
        String resetPasswordLink = resetPassword;
        sendResetPasswordEmail(resetPasswordLink, user,token);

        return new ResponseEntity<>(new ApiResponse(user, "success", false), HttpStatus.OK);
    }

    private void sendResetPasswordEmail(String lien, User user,String token) {
        String toAddress = user.getEmail();
        String senderName = "Courzelo";
        String subject = "Voici le lien pour réinitialiser votre mot de passe";
        String content = "\nBonjour,\n" + "\nVous avez demandé la réinitialisation de votre mot de passe.\n"
                + "\nCliquez sur le lien ci-dessous pour changer votre mot de passe :" + "\nlien :" + lien
                +"\nVoici le code pour vous pouvez modifier votre mot de passe : \n"
                +"\nCode : "+token
                + "\nIgnorez cet e-mail si vous vous souvenez votre mot de passe, "
                + "ou vous n'avez pas fait la demande." + "\nMerci,\n " + "Courzelo .";

        MailDto mail = new MailDto(toAddress, senderName, lien, subject, content);
        emailSender.sendEmail(mail);

    }

    @GetMapping("/reset_password/{resetPasswordToken}")
    public String getUserByResetPasswordToken(@PathVariable String resetPasswordToken) {
        userService.getByResetPasswordToken(resetPasswordToken);
        return "reset_password_form";
    }

    @PostMapping("/reset_password/{resetPasswordToken}")
    User processResetPassword(@RequestBody User resetPassword,
                              @PathVariable String resetPasswordToken) {
        return userRepository.findByResetPasswordToken(resetPasswordToken)
                .map(user -> {
                    String confirmpassword = bCryptPasswordEncoder.encode(resetPassword.getPassword());
                    user.setPassword(confirmpassword);
                    user.setResetPasswordToken(null);
                    userRepository.save(user);
                    sendVerificationEmail(user);
                    return userRepository.save(user);
                })
                .orElseGet(() -> {
                    resetPassword.setResetPasswordToken(resetPasswordToken);
                    return userRepository.save(resetPassword);
                });

    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

    private void sendVerificationEmail(User user) {
        String toAddress = user.getEmail();
        String senderName = "Courzelo";
        String subject = "Confirmation de réinitialisation de mot de passe";
        String content = "Bonjour," + " Votre mot de passe a été réinitialiser avec succes!"
                + "Merci, \n" + "Courzelo.";

        MailDto mail = new MailDto(toAddress, senderName, subject, content);
        emailSender.sendEmail(mail);
    }


    @PostMapping(path = "/change-password")
    public ResponseEntity<ApiResponse> changePassword(@Valid @RequestBody RequestChangePassword changePasswordVM) {
        try {
            userService.changePassword(changePasswordVM.getUser_id(), changePasswordVM.getOldPassword(), changePasswordVM.getPassword());
            return new ResponseEntity<>(new ApiResponse(null, "success", false), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse(null, "Error", false), HttpStatus.BAD_REQUEST);
        }
    }


}
