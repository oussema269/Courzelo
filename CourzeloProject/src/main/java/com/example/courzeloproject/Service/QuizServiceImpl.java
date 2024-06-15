package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Answers;
import com.example.courzeloproject.Entite.Question;
import com.example.courzeloproject.Entite.QuestionWrapper;
import com.example.courzeloproject.Entite.Quiz;
import com.example.courzeloproject.Repository.QuestionRepository;
import com.example.courzeloproject.Repository.QuizRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class QuizServiceImpl implements IQuizService{
    @Autowired
    QuizRepository quizRepository;
    @Autowired
    QuestionRepository questionRepository;
    public ResponseEntity<String> createQuiz(Quiz quiz , String category, int numberOfQue) {
        try {
            List<Question> questions = questionRepository.findRandomQuestionsByCategory(category, numberOfQue);
            quiz.setQuestions(questions);
            quizRepository.save(quiz);
            return new ResponseEntity<>("Quiz créé avec succès", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erreur lors de la création du quiz", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(String id) {

        Optional<Quiz> optionalQuiz = quizRepository.findById(id);
        if (optionalQuiz.isPresent()) {
            Quiz quiz = optionalQuiz.get();
            List<QuestionWrapper> questionWrappers = new ArrayList<>();
            for (Question question : quiz.getQuestions()) {
                QuestionWrapper questionWrapper = new QuestionWrapper();

                questionWrapper.setQuestion_title(question.getQuestion_title());
                questionWrapper.setOption1(question.getOption1());
                questionWrapper.setOption2(question.getOption2());
                questionWrapper.setOption3(question.getOption3());
                questionWrapper.setOption4(question.getOption4());
                questionWrappers.add(questionWrapper);
            }
            return new ResponseEntity<>(questionWrappers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @Override
    public ResponseEntity<Integer> calculateResult(String id, List<Answers> responses) {
        Quiz quiz = quizRepository.findById(id).get();
        List<Question> questions =  quiz.getQuestions();
        int i = 0;
        int right = 0;
        for(Answers res: responses)
        {
            if(res.getResponse().equals(questions.get(i++).getRight_answer()))
                right++;
        }
        return new ResponseEntity<>(right,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Quiz>> getAllQuizs() {
        return new ResponseEntity<>(quizRepository.findAll(),HttpStatus.OK);
    }
}


