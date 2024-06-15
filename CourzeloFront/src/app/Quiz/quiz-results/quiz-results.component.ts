import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizResultService } from 'src/app/service/quiz-result.service';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {
  score: number;
  questions: any[];

  constructor(private router: Router, private route: ActivatedRoute , private quizService : QuizResultService ) {}


ngOnInit(): void {
  const results = this.quizService.getResults();
  if (results) {
    this.score = results.score;
    this.questions = results.questions;
  } else {
    console.error('Quiz data not found.');
    // Handle the missing data, e.g., navigate back or display an error message
  }
}
  

downloadResults(): void {
  // const doc = new jsPDF();

  // let y = 10; 
  // this.questions.forEach((question, index) => {
  //   doc.text(`Question ${index + 1}: ${question.question_title}`, 10, y);
  //   y += 10;
  //   doc.text(`Answer: ${question.right_answer}`, 10, y);
  //   y += 10; 
  // });
  // doc.save('quiz-results.pdf');
}

}
