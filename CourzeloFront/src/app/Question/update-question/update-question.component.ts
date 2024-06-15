import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/model/Question.model';
import { QuestionService } from 'src/app/service/question.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  id: string;
  question: Question = new Question();
  hasFormErrors: string = "";
  //error: string = '';

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    this.questionService.getQuestionById(this.id).subscribe(
      (data) => {
        this.question = data;
        console.log(this.question);
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
   if (this.validateForm()) {
    this.questionService.updateQuestion(this.id, this.question).subscribe(
      (data) => {
        this.goToQuestionList();
      },
      (error) => console.log(error)
    );
  
}
  } 

  goToQuestionList() {
    this.router.navigate(['/question-list']);
  }

 validateForm(): boolean {
    if (!this.question.question_title || !this.question.difficultylevel || !this.question.right_answer) {
      this.hasFormErrors = 'Veuillez remplir tous les champs.';
      return false;
    }
    return true;
  }

}
