package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.FicheModuleCour;

import java.util.List;

public interface IFicheModuleCourService {
    public FicheModuleCour ajouterFicheModule(FicheModuleCour ficheModuleCour);
    public List<FicheModuleCour> getFicheCours();

}
