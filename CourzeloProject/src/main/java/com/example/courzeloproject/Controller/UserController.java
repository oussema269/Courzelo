package com.example.courzeloproject.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.courzeloproject.Entite.ERole;
import com.example.courzeloproject.Entite.Profile;
import com.example.courzeloproject.Entite.User;
import com.example.courzeloproject.Service.IProfileService;
import com.example.courzeloproject.Service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    IUserService userService ;

    @GetMapping("/user/{role}")
    public List<User> getFormateur(@PathVariable("role") ERole role){
        return userService.getUsersByRole(role) ;
    }

    @GetMapping("/user")
    public List<User> getAllUser(){
        return userService.getAllUsers() ;
    }
    @GetMapping("/auth/connect/{verificationCode}")
    public boolean verifyUser(@PathVariable String verificationCode) {
        return userService.verify(verificationCode) ;

    }
    @DeleteMapping("/user/delete")
    public void deleteParticipant(){

         userService.deleteUser();
        System.out.println("user supprime ");
    }


}