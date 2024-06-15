import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quizs } from 'src/app/data/quizArray';
import { QuizResultService } from 'src/app/service/quiz-result.service';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './make-quiz.component.html',
  styleUrls: ['./make-quiz.component.css']
})
export class MakeQuizComponent implements OnInit {
  quizzes: any[] = Quizs;
  currentQuiz: any;
  currentQuestionIndex: number = 0;
  score: number = 0;

  constructor(private route: ActivatedRoute , private router : Router , private quizresultat : QuizResultService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const quizId = params.get('id');
      console.log(`Quiz ID from URL: '${quizId}' (Type: ${typeof quizId})`);
  
      this.currentQuiz = this.quizzes.find(quiz => {
          console.log(`Current Quiz ID: '${quiz.id}' (Type: ${typeof quiz.id})`);
          return String(quiz.id) === String(quizId);
      });
  
      if (!this.currentQuiz || !this.currentQuiz.questions) {
          console.error('Quiz not found or it has no questions.');
          return;
      }
  
      this.currentQuestionIndex = 0;
      this.score = 0;
  });
  
  }

  selectAnswer(option: string): void {
    if (!this.currentQuiz || !this.currentQuiz.questions) return;

    const question = this.currentQuiz.questions[this.currentQuestionIndex];
    if (option === question.right_answer) {
      this.score += 1;
    }
    this.currentQuestionIndex += 1;
    if (this.currentQuestionIndex >= this.currentQuiz.questions.length) {
      this.finishQuiz();
    }
  }

  finishQuiz(): void {
    this.quizresultat.storeResults(this.score, this.currentQuiz.questions);
    this.router.navigate(['/quiz-results']);
  }
}
