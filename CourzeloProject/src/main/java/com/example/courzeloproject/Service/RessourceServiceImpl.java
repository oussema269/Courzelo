package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Cour;
import com.example.courzeloproject.Entite.Ressource;
import com.example.courzeloproject.Repository.ICourRepository;
import com.example.courzeloproject.Repository.IRessourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class RessourceServiceImpl implements IRessourceService {
    public static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/uploads";


    @Autowired
    IRessourceRepository iRessourceRepository;
    @Autowired
    ICourRepository iCourRepository;
    @Override
    public Ressource ajouterRessource(Ressource ressource) {

        return iRessourceRepository.save(ressource);

    }

    @Override
    public List<Ressource> getRessource() {
        return iRessourceRepository.findAll();
    }

    @Override
    public void supprimerRessource(String idr) {
       Ressource r= iRessourceRepository.findById(idr).get();
         iRessourceRepository.delete(r);
    }

    @Override
    public Ressource modifierRessource(Ressource r, String idr) {

        Ressource res = iRessourceRepository.findById(idr).get();
        res.setNomRessource(r.getNomRessource());
        return iRessourceRepository.save(res);
    }

    @Override
    public List<Ressource> getRessourcesByCourId(String id) {
            Cour cour = iCourRepository.findById(id).get();
            return cour.getRessourceList(); // Suppose que getRessources() est une méthode qui retourne le tableau de ressources
        }



    @Override
    public String uploadImage(Model model, MultipartFile file) {

        StringBuilder fileNames = new StringBuilder();
        try {
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, file.getOriginalFilename());
            Files.write(fileNameAndPath, file.getBytes());
            fileNames.append(file.getOriginalFilename());
            model.addAttribute("msg", "Uploaded images: " + fileNames.toString());
        } catch (IOException e) {
            // Gérer les erreurs liées à l'écriture du fichier, par exemple, en ajoutant un message d'erreur au modèle.
            model.addAttribute("error", "Error uploading the image.");
            e.printStackTrace(); // Vous pouvez également logger l'exception.
        }
        return "imageupload/index";
    }

}
