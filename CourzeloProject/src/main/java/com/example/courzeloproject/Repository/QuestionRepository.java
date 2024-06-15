package com.example.courzeloproject.Repository;

import com.example.courzeloproject.Entite.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.List;

@Repository
public interface QuestionRepository extends MongoRepository<Question,String>
{
    //@Query(value = "SELECT * FROM question q WHERE q.category=:category ORDER BY RANDOM() LIMIT :numberOfQue", nativeQuery = true)

   /* db.question.aggregate([
    { $match: { category: "VotreCatégorie" } }, // Filtrer les questions par catégorie
    { $sample: { size: numberOfQue } } // Obtenir un échantillon aléatoire de la taille spécifiée
])*/
  // @Query("{ 'category' : ?0, $sample: { size: ?1 } }")
   @Query("{ 'category' : ?0 }")
   List<Question> findRandomQuestionsByCategory(String category, int numberOfQue);

    List<Question> findByCategory(String category);

    List<Question> findBydifficultylevel(String difficultlevel);



}
