package com.example.courzeloproject.Repository;

import com.example.courzeloproject.Entite.Faculte;
import com.example.courzeloproject.Entite.Pole;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoleRepository extends MongoRepository<Pole,String> {
    Pole findPoleByCodePole(String code);
}
