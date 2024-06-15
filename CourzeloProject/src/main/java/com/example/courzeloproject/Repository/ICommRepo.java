package com.example.courzeloproject.Repository;

import com.example.courzeloproject.Entite.Commentaire;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICommRepo  extends MongoRepository<Commentaire,String> {
}
