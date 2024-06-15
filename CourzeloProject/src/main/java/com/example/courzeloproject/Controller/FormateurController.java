package com.example.courzeloproject.Controller;

import com.example.courzeloproject.Entite.ERole;
import com.example.courzeloproject.Entite.Faculte;
import com.example.courzeloproject.Entite.Role;
import com.example.courzeloproject.Entite.User;
import com.example.courzeloproject.Repository.RoleRepo;
import com.example.courzeloproject.Repository.UserRepo;
import com.example.courzeloproject.Security.jwt.JwtUtils;
import com.example.courzeloproject.Service.IFaculteService;
import com.example.courzeloproject.Service.UserDetailsImpl;
import com.example.courzeloproject.Service.UserServiceImpl;
import com.example.courzeloproject.payload.request.LoginRequest;
import com.example.courzeloproject.payload.request.SignupRequest;
import com.example.courzeloproject.payload.response.JwtResponse;
import com.example.courzeloproject.payload.response.MessageResponse;
import jakarta.validation.Valid;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class FormateurController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepo userRepository;

    @Autowired
    RoleRepo roleRepository;
    @Autowired
    UserServiceImpl userService;

    @Autowired
    IFaculteService iFaculteService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateAF(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUserAF(@Valid @RequestBody SignupRequest signUpRequest) {
//        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
//            return ResponseEntity
//                    .badRequest()
//                    .body(new MessageResponse("Error: Username is already taken!"));
//        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }
        //generation du mdp
        String randomCode = RandomStringUtils.random(8,true,true);
        signUpRequest.setPassword(randomCode);

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_SUPERADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "participant":
                        Role PRole = roleRepository.findByName(ERole.ROLE_PARTICIPANT)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(PRole);

                        break;
                    case "formateur":
                        Role FRole = roleRepository.findByName(ERole.ROLE_FORMATEUR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(FRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_SUPERADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        String ident = RandomStringUtils.random(7,false,true) ;
        ident = ident.substring(0, 4) + "courzelo" + ident.substring(4);

         user.setUsername(ident);
        user.setRoles(roles);
        //Affecter a une faculté
        Faculte faculte =iFaculteService.getFaculteByName(signUpRequest.getNomFaculte());
        user.setFaculte(faculte);
        userRepository.save(user);
        this.userService.sendInformationEmail(user,randomCode);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }




}
