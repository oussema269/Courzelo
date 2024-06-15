package com.example.courzeloproject.Service;


import com.example.courzeloproject.Entite.Domaine;
import com.example.courzeloproject.Repository.IDomaineRepo;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Slf4j
@Service
public class DomaineServiceimpl implements IDomaineService {
    @Autowired
    IDomaineRepo iDomaineRepo;
    @Value("${file.upload-dir}")
    private String uploadDir;


    @Override
    public Domaine ajoutDomaine(Domaine d) {
        return iDomaineRepo.save(d);
    }

    @Override
    public List<Domaine>  listededomaine() {
        return iDomaineRepo.findAll();
    }





    @Override
    public Domaine deleteDomaineById(String id) {

        iDomaineRepo.deleteById(id);

        return null;
    }

    @Override
    public Domaine updateDomaine(Domaine d ,String id) {
        Domaine domaine ;
        domaine=iDomaineRepo.findById(id).get();
        domaine.setNom(d.getNom());
        domaine.setDescription(d.getDescription());



        return iDomaineRepo.save(domaine);
    }
  @Override
    public String storeFile(MultipartFile file, String id) {
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
        String newFileName = generateNewFileName(originalFileName);

        Path uploadPath = Paths.get(uploadDir);

        try {
            if (Files.notExists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(newFileName);
            Files.copy(file.getInputStream(), filePath);

           Domaine domaine = iDomaineRepo.findById(id).get();
            domaine.setPhoto(newFileName);
            iDomaineRepo.save(domaine); // Save the updated blog entity

            return newFileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + newFileName, e);
        }
    }

    private String generateNewFileName(String originalFileName) {
        // You can customize this method to generate a unique file name.
        // For example, appending a timestamp or using a UUID.
        String timestamp = String.valueOf(System.currentTimeMillis());
        return timestamp + "_" + originalFileName;
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

}
