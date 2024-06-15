package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Question;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IQuestionService {
    public List<Question> findRandomQuestionsByCategory(String category, int numberOfQue);
    public ResponseEntity<List<Question>> getAllQuestions();
    public ResponseEntity<List<Question>> getQuestionsByCategory(String category);
    public ResponseEntity<List<Question>> getQuestionsByLevel(String difficultylevel);
    public ResponseEntity<String> addQuestion(Question question);
    public void deleteQuestion(String id);

    public Question updateQuestion( String id, Question question);

    /* get question by id */
    public Question getQuestionById(String id);





    }
