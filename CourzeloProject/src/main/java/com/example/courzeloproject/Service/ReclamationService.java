package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Reclamtion;
import com.example.courzeloproject.Repository.ReclamationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Arrays;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class ReclamationService implements IReclamationServicelmp {

    @Autowired
    ReclamationRepository reclamationRepository;

    @Autowired
    EmailSenderService emailSenderService; // Inject EmailSenderService



    private static final List<String> BAD_WORDS = Arrays.asList("nabil", "hamdi", "aymen");

    @Override
    public Reclamtion addReclamation(Reclamtion reclamtion) {
        // Sanitize description
        sanitizeDescription(reclamtion);

        reclamtion.setDateReclamation(LocalDateTime.now());
        Reclamtion newReclamation = reclamationRepository.insert(reclamtion);

        // Send email notification for the new reclamation
        emailSenderService.sendSimpleEmail("pipolatounes@gmail.com",
                "Nouvelle réclamation ajoutée",
                "Une nouvelle réclamation a été ajoutée avec le titre : " + reclamtion.getTitre());

        // Send SMS notification for the new reclamation

        return newReclamation;
    }

    @Override
    public Reclamtion updateReclamation(Reclamtion reclamtion) {
        reclamtion.setDateReclamation(LocalDateTime.now());
        // Sanitize description
        sanitizeDescription(reclamtion);

        return reclamationRepository.save(reclamtion);
    }

    // Method to sanitize the description by replacing bad words with asterisks
    private void sanitizeDescription(Reclamtion reclamtion) {
        String description = reclamtion.getDescription();
        for (String badWord : BAD_WORDS) {
            // Replace bad words with asterisks
            description = description.replaceAll("(?i)" + badWord, "*".repeat(badWord.length()));
        }
        reclamtion.setDescription(description);
    }

    @Override
    public void deleteReclamation(String reclamationId) {
        Reclamtion reclamation = reclamationRepository.findReclamtionByreclamationId(reclamationId);
        reclamationRepository.delete(reclamation);
    }

    @Override
    public List<Reclamtion> getAllReclamations() {
        return reclamationRepository.findAll();
    }

    @Override
    public Reclamtion getReclamationById(String reclamationId) {
        return reclamationRepository.findReclamtionByreclamationId(reclamationId);
    }

    @Override
    public List<Reclamtion> searchReclamationsByTitle(String title) {
        return reclamationRepository.findByTitreContainingIgnoreCase(title);
    }

    @Override
    public List<Reclamtion> getAllReclamationsSortedByTitle() {
        List<Reclamtion> reclamations = reclamationRepository.findAll();
        reclamations.sort(Comparator.comparing(Reclamtion::getTitre));
        return reclamations;
    }
}
