package com.example.courzeloproject.Entite;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "FicheModuleCour")
public class FicheModuleCour {
    @Id
    private String idFicheCour;
    private String nomModule;
    private int horaire;
    private float ects;
    @DBRef
    private User responsableModule;
    private Niveau niveau;
    private String objectif;
    @DBRef
    private List<Chapitre> chapitreList;


}
