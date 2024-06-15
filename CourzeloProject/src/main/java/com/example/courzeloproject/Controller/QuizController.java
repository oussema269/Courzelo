package com.example.courzeloproject.Controller;

import com.example.courzeloproject.Entite.Answers;
import com.example.courzeloproject.Entite.QuestionWrapper;
import com.example.courzeloproject.Entite.Quiz;
import com.example.courzeloproject.Service.QuizServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/quiz")
public class QuizController {
    @Autowired
    QuizServiceImpl quizService;

    @PostMapping("/create/{num}/{categorie}")
    public ResponseEntity<String> createQuiz(@RequestBody Quiz quiz, @PathVariable("num") int numberOfQue, @PathVariable("categorie") String category)
    {
        return quizService.createQuiz(quiz,category,numberOfQue);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable("id") String id)
    {
        try {
            ResponseEntity<List<QuestionWrapper>> response = quizService.getQuizQuestions(id);
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/getResult/{id-quiz}")
    public ResponseEntity<Integer> getQuizQuestions(@RequestBody List<Answers> answers,
                                                                  @PathVariable("id-quiz") String id)
    {
       return quizService.calculateResult(id,answers) ;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Quiz>> getAllQuizs()
    {
        return quizService.getAllQuizs();
    }


}
