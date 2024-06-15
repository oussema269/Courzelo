package com.example.courzeloproject.Repository;

import com.example.courzeloproject.Entite.Chapitre;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IChapitreRepository extends MongoRepository<Chapitre,String> {
}
