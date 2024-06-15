package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.FicheModuleCour;
import com.example.courzeloproject.Repository.IFicheModuleCourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FicheModuleCourServiceImp implements IFicheModuleCourService{
    @Autowired
    IFicheModuleCourRepository iFicheModuleCourRepository;
    @Override
    public FicheModuleCour ajouterFicheModule(FicheModuleCour ficheModuleCour) {
        return iFicheModuleCourRepository.save(ficheModuleCour);
    }

    @Override
    public List<FicheModuleCour> getFicheCours() {
        return iFicheModuleCourRepository.findAll();
    }
}
