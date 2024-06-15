package com.example.courzeloproject.Entite;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document("Cour")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Cour {

    @Id
    private String idCour;
    private String nomCour;
    private String description;
    private Date date;
    private Niveau niveau;
    private TypeCour typeCour;
    private String photo;
    private double prix;
    private int test;
    private String nomDomaine;
    @DBRef
    private User user ;
    @DBRef
    private List<Ressource> ressourceList=new ArrayList<>();
    @DBRef
    private  Domaine domaine;



}
