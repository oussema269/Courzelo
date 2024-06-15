package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.ERole;
import com.example.courzeloproject.Entite.Role;
import com.example.courzeloproject.Entite.User;
import com.example.courzeloproject.Repository.UserRepo;
import com.example.courzeloproject.dto.MailDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements IUserService{
    @Autowired
    UserRepo repo ;
    @Autowired
    EmailSender emailSender ;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMddHHmmssSSS");
    public String generateIdentifier() {
        // Obtenir la date et l'heure actuelles
        LocalDateTime now = LocalDateTime.now();
        // Formater la date et l'heure selon le format spécifié
        String formattedDateTime = now.format(formatter);
        formattedDateTime = formattedDateTime.substring(0, 4) + "courzelo" + formattedDateTime.substring(4);
        // Retourner l'identifiant généré
        return formattedDateTime;
    }


    public User addUser(User u){
        return repo.save(u);
    }

    public User updateUser(User u){
        return repo.save(u);
    }
    public User updateUserById(String id){
        User u = repo.findById(id).get() ;
        return repo.save(u);
    }
    public void deleteUser(){

        repo.removeAllByVerificationCodeIsNotNull() ;
    }
    //    public List<User> getUserByRole(String role){
//        return repo.findByRolesName(role);
//    }
    public List<User> getUsersByRole(ERole roleName) {
        List<User> users = repo.findAll();
        List<User> usersWithRole = new ArrayList<>();

        for (User user : users) {
            for (Role role : user.getRoles()) {
                if (role.getName().equals(roleName)) {
                    usersWithRole.add(user);
                    break; // Exit the inner loop once the role is found
                }
            }
        }

        return usersWithRole;
    }
    public List<User> getAllUsers(){
        return repo.findAll() ;
    }
    public void activerUser(String idUser) {
        User user = repo.findById(idUser).get();
        user.setActive(true);
        repo.save(user);
/*		String lien = "http://localhost:4200/login";
		String toAddress = user.getEmail();
		String senderName = "Courzelo";
		String subject = "Activation Compte";
		String content = "Monsieur/Madame [[email]],<br>"
				+ "Votre compte est devient active :<br>" + "<p><a href=\"" + lien
				+ "\">Connecter</a></p>" + "Merci,<br>" + "Edulink.";

		MailDto mail = new MailDto(toAddress, senderName, lien, subject, content);
		gestionNotificationsService.sendEmail(mail);*/


    }

    public void desactiverUser(String idUser) {
        User user = repo.findById(idUser).get();
        user.setActive(false);
        repo.save(user);
	/*	String toAddress = user.getEmail();
		String senderName = "Courzelo";
		String subject = "Activation Compte";
		String content = "Monsieur/Madame [[email]],<br>"
				+ "Votre compte est devient desactive :<br>"
				 + "Merci,<br>" + "Edulink.";

		MailDto mail = new MailDto(toAddress, senderName, subject, content);
		gestionNotificationsService.sendEmail(mail);*/


    }

    public void sendVerificationEmail(User user, String lien) {
        String toAddress = user.getEmail();
        String senderName = "Courzelo";
        String subject = "Please verify your registration";
        String content = "Sir/Madam \n "
                + "Verification Code : " + lien ;


        MailDto mail = new MailDto(toAddress, senderName, lien, subject, content);
        emailSender.sendEmail(mail);
    }
    public void sendInformationEmail(User user,String code) {
        String toAddress = user.getEmail();
        String senderName = "Courzelo";
        String subject = "Welcome To Courzelo";
        String content = "Dear Sir/Madam,\n"
                + "We are delighted to welcome you to our Courzelo platform! \n" +
                "we would like to send you my most sincere congratulations on your recent " +
                "assignment to  <strong>" + user.getFaculte().getNom() + "</strong>."+
                "\nYour username is: "+user.getUsername()+" " +
                "\nyour password is:"+code+"\n"
                + "If you have any questions or need assistance, please don't hesitate to contact us.\n"
                + "Best regards,\n"
                + "The Courzelo Team";


        MailDto mail = new MailDto(toAddress, senderName, subject, content);
        emailSender.sendEmail(mail);
    }

    public boolean verify(String verificationCode) {
        User user = repo.findByVerificationCode(verificationCode);

        if (user == null || user.isEnabled()) {
            return false;
        } else {
            user.setVerificationCode(null);
            user.setEnabled(true);
            repo.save(user);
            return true;
        }

    }

    public Optional<User> getByResetPasswordToken(String token) {
        return repo.findByResetPasswordToken(token);
    }
    public void resetPassword(String token, String email) throws UsernameNotFoundException {
        User user = repo.findByEmail(email);
        if (user != null) {
            user.setResetPasswordToken(token);
            repo.save(user);
        } else {
            throw new UsernameNotFoundException("Could not find any customer with the email " + email);
        }
    }

    @Transactional
    public void changePassword(String id, String oldPassword, String password) throws Exception {
        Optional<User> user = repo.findById(id);
        if (user.isPresent()) {
            try {
                changePassword(user.get(), oldPassword, password);
            } catch (Exception e) {
                throw new Exception("");
            }
        } else {
            throw new Exception();
        }
    }

    @Transactional
    public void changePassword(User user, String oldPassword, String password) throws Exception {
        if (!bCryptPasswordEncoder.matches(oldPassword, user.getPassword())) {
            throw new Exception("");
        }
        changePassword(user, password);
    }
    @Transactional
    public void changePassword(User user, String password) {
        user.setPassword(bCryptPasswordEncoder.encode(password));
        repo.save(user);

    }



}
