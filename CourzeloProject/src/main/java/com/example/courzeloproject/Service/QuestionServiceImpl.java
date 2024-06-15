package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Question;
import com.example.courzeloproject.Repository.QuestionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class QuestionServiceImpl implements IQuestionService {
    @Autowired
    QuestionRepository questionRepository;


    // Méthode pour récupérer un échantillon aléatoire de questions par catégorie
    public List<Question> findRandomQuestionsByCategory(String category, int numberOfQue) {
        List<Question> allQuestions = questionRepository.findByCategory(category);
        Collections.shuffle(allQuestions); // Mélange aléatoire des questions
        return allQuestions.subList(0, Math.min(numberOfQue, allQuestions.size()));
    }


    public ResponseEntity<List<Question>> getAllQuestions() {
        try {
            return new ResponseEntity<>(questionRepository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<List<Question>> getQuestionsByCategory(String category) {
        return new ResponseEntity<>(questionRepository.findByCategory(category), HttpStatus.OK);
    }

    public ResponseEntity<List<Question>> getQuestionsByLevel(String difficultylevel) {
        return new ResponseEntity<>(questionRepository.findBydifficultylevel(difficultylevel), HttpStatus.OK);
    }

    public ResponseEntity<String> addQuestion(Question question) {
        if (question != null) {
            questionRepository.save(question);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    public void deleteQuestion(String id) {
        questionRepository.deleteById(id);

    }

    public boolean existById(String id) {
        return questionRepository.existsById(id);
    }

    public Question updateQuestion(String id, Question question) {
        Question existQuestion = questionRepository.findById(id).get();

        if (existQuestion.getId()!= "") {
            existQuestion.setCategory(question.getCategory());
            existQuestion.setDifficultylevel(question.getDifficultylevel());
            existQuestion.setOption1(question.getOption1());
            existQuestion.setOption2(question.getOption2());
            existQuestion.setOption3(question.getOption3());
            existQuestion.setOption4(question.getOption4());
            existQuestion.setQuestion_title(question.getQuestion_title());
            existQuestion.setRight_answer(question.getRight_answer());
        }
        return questionRepository.save(existQuestion) ;
    }

    @Override
    public Question getQuestionById(String id) {
        return questionRepository.findById(id).get();
    }
}