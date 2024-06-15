package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Reclamtion;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

public interface IReclamationServicelmp {
    public Reclamtion addReclamation (Reclamtion reclamtion) ;
    public Reclamtion updateReclamation (Reclamtion reclamtion) ;
    public void deleteReclamation(String reclamationId);
    public List<Reclamtion> getAllReclamations() ;
    public Reclamtion getReclamationById(String reclamationId);

    public List<Reclamtion> searchReclamationsByTitle(String title);
    public List<Reclamtion> getAllReclamationsSortedByTitle();
}

