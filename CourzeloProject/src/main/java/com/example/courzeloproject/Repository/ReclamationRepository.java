package com.example.courzeloproject.Repository;

import com.example.courzeloproject.Entite.Reclamtion;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReclamationRepository extends MongoRepository<Reclamtion, Integer> {
    List<Reclamtion> findByTitreContainingIgnoreCase(String titre);
    Reclamtion findReclamtionByreclamationId(String id);

}
