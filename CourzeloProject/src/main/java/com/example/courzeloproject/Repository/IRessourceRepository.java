package com.example.courzeloproject.Repository;

import com.example.courzeloproject.Entite.Ressource;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRessourceRepository extends MongoRepository<Ressource,String> {
}
