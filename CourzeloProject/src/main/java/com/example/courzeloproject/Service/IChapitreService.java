package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Chapitre;

import java.util.List;

public interface IChapitreService {
    Chapitre ajouterChapitre(Chapitre chapitre);
    List<Chapitre> getChapitres();
}
