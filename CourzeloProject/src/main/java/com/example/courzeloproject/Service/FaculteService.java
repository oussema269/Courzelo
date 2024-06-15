package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Faculte;
import com.example.courzeloproject.Entite.Pole;
import com.example.courzeloproject.Entite.User;
import com.example.courzeloproject.Repository.FaculteRepository;
import com.example.courzeloproject.Repository.PoleRepository;

import com.example.courzeloproject.Repository.UserRepo;
import com.example.courzeloproject.dto.MailDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class FaculteService implements IFaculteService{
    @Autowired
    EmailSender iServiceEmail;
    @Autowired
    UserRepo userRepository;
@Autowired
    FaculteRepository faculteRepository;
@Autowired
PoleRepository poleRepository;
    @Value("${file.upload-dir}")
    private String uploadDir;
    @Override
    public Faculte addFaculte(Faculte faculte) {
        return faculteRepository.save(faculte);
    }

    @Override
    public void deleteFaculte(String id) {
        faculteRepository.deleteById(id);
    }

    @Override
    public List<Faculte> getAllFacultes() {
        return faculteRepository.findAll();
    }

    @Override
    public Faculte DetailsFaculte(String codeFaculte) {
        return faculteRepository.findFaculteByCodeFaculte(codeFaculte);
    }

    @Override
    public Faculte updatefaculte(Faculte faculte, String id) {
        Faculte newfaculte=faculteRepository.findFaculteByCodeFaculte(id);
        newfaculte.setNom(faculte.getNom());
        newfaculte.setAdresse(faculte.getAdresse());
        newfaculte.setDescription(faculte.getDescription());
        newfaculte.setTelephone((faculte.getTelephone()));
        newfaculte.setPhotoUrl(faculte.getPhotoUrl());

        return faculteRepository.save(newfaculte);
    }

    @Override
    public Faculte storeFile(MultipartFile file, String faculteCode)  {
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
        String newFileName = generateNewFileName(originalFileName);

        Path uploadPath = Paths.get(uploadDir);

        try {
            if (Files.notExists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(newFileName);
            Files.copy(file.getInputStream(), filePath);

            Faculte faculte = faculteRepository.findFaculteByCodeFaculte(faculteCode);
            faculte.setPhotoUrl(newFileName);
            return faculteRepository.save(faculte); // Save the updated blog entity

        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + newFileName, e);
        }
    }

    @Override
    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("File not found: " + fileName);
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("File not found: " + fileName, e);
        }
    }

    @Override
    public List<Faculte> getFaculteByPoleId(String codep) {
        return faculteRepository.findFacultesByPoleCodePole(codep);
    }

    @Override
    public Faculte addFaculteToPole(String polec, Faculte faculte) {
        Pole pole = poleRepository.findById(polec).orElse(null);


        if (pole != null) {
            if (pole.getFacultes() == null) {
                pole.setFacultes(new ArrayList<>());

            }

            faculte.setPole(pole);
            Faculte savedFaculte = faculteRepository.save(faculte);
            pole.getFacultes().add(savedFaculte);
            poleRepository.save(pole);
           // sendAddedFaculteEmail(user1);
            return faculte;
        }

        return null;
    }

    private String generateNewFileName(String originalFileName) {
        // You can customize this method to generate a unique file name.
        // For example, appending a timestamp or using a UUID.
        String timestamp = String.valueOf(System.currentTimeMillis());
        return timestamp + "_" + originalFileName;
    }
    
    public void sendAddedFaculteEmail(User user) {
        String toAddress = user.getEmail();
        String senderName = "Courzelo";
        String subject = "Faculte Added";
        String content = "Hello, "
                + "This email sent to inform you that there is a new added Faculte aded to this pole ." ;


        MailDto mail = new MailDto(toAddress, senderName, subject, content);
        iServiceEmail.sendEmail(mail);
    }

//youssef
    @Override
    public Faculte getFaculteByName(String nomF) {
        return faculteRepository.findByNom(nomF);
    }
}
