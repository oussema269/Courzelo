package com.example.courzeloproject.Repository;


import com.example.courzeloproject.Entite.Domaine;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IDomaineRepo extends MongoRepository<Domaine,String> {

Domaine findDomaineByNom(String nom);

}