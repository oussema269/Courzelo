package com.example.courzeloproject.Repository;

import com.example.courzeloproject.Entite.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends MongoRepository<Quiz,String>
{

}
