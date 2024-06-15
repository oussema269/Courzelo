package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Faculte;
import com.example.courzeloproject.Entite.Pole;
import com.example.courzeloproject.Entite.User;
import com.example.courzeloproject.Repository.FaculteRepository;
import com.example.courzeloproject.Repository.PoleRepository;
import com.example.courzeloproject.Repository.UserRepo;
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
import java.util.List;

@Service
@Slf4j
public class PoleService implements IPoleService{
    @Autowired
    UserRepo userRepository;
    @Autowired
    PoleRepository poleRepository;
    @Autowired
    FaculteRepository faculteRepository;
    @Value("${file.upload-dir}")
    private String uploadDir;
    @Override
    public Pole addPole(Pole pole) {
        User user2=userRepository.findUserById("user2");
        pole.setUser(user2);
        return poleRepository.save(pole);
    }

    @Override
    public void deletePole(String id) {
        poleRepository.deleteById(id);
    }

    @Override
    public List<Pole> getAllPoles() {
        return poleRepository.findAll();
    }

    @Override
    public Pole DetailsPole(String codePole) {
        return poleRepository.findPoleByCodePole(codePole);
    }

    @Override
    public Pole updatePole(Pole pole, String id) {
      Pole newpole=poleRepository.findPoleByCodePole(id);
      newpole.setAdresse(pole.getAdresse());
      newpole.setNom(pole.getNom());
      newpole.setDescription(pole.getDescription());
      newpole.setPhotoUrl(pole.getPhotoUrl());

        return poleRepository.save(newpole);

    }

    @Override
    public Pole storeFile(MultipartFile file, String poleCode) {
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
        String newFileName = generateNewFileName(originalFileName);

        Path uploadPath = Paths.get(uploadDir);

        try {
            if (Files.notExists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(newFileName);
            Files.copy(file.getInputStream(), filePath);

            Pole pole = poleRepository.findPoleByCodePole(poleCode);
            pole.setPhotoUrl(newFileName);
            return poleRepository.save(pole); // Save the updated blog entity


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
    public Pole affecterFaculteApole(Faculte f, String codep) {
        Pole p=poleRepository.findById(codep).get();
        if(faculteRepository.existsById(f.getCodeFaculte())){
            p.getFacultes().add(f);
            log.info("yes");
        }
        else {
            p.getFacultes().add(f);
            faculteRepository.save(f);
            log.info("okay");
        }
        return poleRepository.save(p);
    }





    private String generateNewFileName(String originalFileName) {
        // You can customize this method to generate a unique file name.
        // For example, appending a timestamp or using a UUID.
        String timestamp = String.valueOf(System.currentTimeMillis());
        return timestamp + "_" + originalFileName;
    }
}
