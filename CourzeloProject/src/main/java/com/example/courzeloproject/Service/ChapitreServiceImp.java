package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Chapitre;
import com.example.courzeloproject.Repository.IChapitreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChapitreServiceImp implements IChapitreService{
    @Autowired
    IChapitreRepository iChapitreRepository;

    @Override
    public Chapitre ajouterChapitre(Chapitre chapitre) {
        return iChapitreRepository.save(chapitre);
    }

    @Override
    public List<Chapitre> getChapitres() {
        return iChapitreRepository.findAll();

    }
}
