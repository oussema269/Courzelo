package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Answers;
import com.example.courzeloproject.Entite.QuestionWrapper;
import com.example.courzeloproject.Entite.Quiz;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IQuizService {
    public ResponseEntity<String> createQuiz(Quiz quiz , String category, int numberOfQue) ;
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(String id) ;
    public ResponseEntity<Integer> calculateResult(String id, List<Answers> response) ;
    /* get list of quizs */
    public ResponseEntity<List<Quiz>> getAllQuizs();
}
