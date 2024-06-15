package com.example.courzeloproject.Repository;

import com.example.courzeloproject.Entite.FicheModuleCour;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFicheModuleCourRepository extends MongoRepository<FicheModuleCour,String> {
}
