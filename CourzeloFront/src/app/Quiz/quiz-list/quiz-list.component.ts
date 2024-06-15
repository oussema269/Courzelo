import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';// Adjust the import based on your actual path

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  quizzes: any[] = []; // Changed from questions to quizzes

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.getQuizzes();
  }

  private getQuizzes() {
    this.quizService.getQuizList() // Assuming you have this method in your QuizService
      .subscribe({
        next: (quizzes) => {
          this.quizzes = quizzes;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  updateQuiz(id: string) { // Adjusted for quiz
    this.router.navigate(['/updateQuiz', id]); // Adjust the route as necessary
  }

  

}
