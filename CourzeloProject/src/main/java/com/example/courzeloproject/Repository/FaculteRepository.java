package com.example.courzeloproject.Repository;

import com.example.courzeloproject.Entite.Faculte;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FaculteRepository extends MongoRepository<Faculte,String> {
    Faculte findFaculteByCodeFaculte(String code);
    List<Faculte> findFacultesByPoleCodePole (String codeP);

    //youssef
    Faculte findByNom (String nomF);
}
