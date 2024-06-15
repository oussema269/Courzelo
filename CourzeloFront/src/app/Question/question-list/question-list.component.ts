import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/model/Question.model';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questions: Question[] = [];
  searchTitle: string = '';
  searchCategory: string = '';
  searchDifficulty: string = '';
  constructor(private questionService: QuestionService ,private router : Router ) {}

  ngOnInit(): void {
     this.getQuestions();
  }

  private getQuestions(){
    this.questionService.getQuestionList()
    .subscribe({
      next: (questions) => {
        //console.log("wsel lena ")
        this.questions = questions;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  //supprimer et lister les questions et creer une question on verra
  updateQuestion(id: string){
    this.router.navigate(['/updateQuestion', id]);
  }

  deleteQuestion(id: string){
    if(confirm("Are you sure you want to delete this question?")) {
    this.questionService.deleteQuestion(id).subscribe( data => {
      console.log(data);
      this.getQuestions();
    })
  }
  }

  deleteTest(question : Question): void{
    this.questionService.deleteTest(question.id).subscribe(()=>{
      this.questions = this.questions.filter((q)=>q.id !==question.id);
    });
  }
  
}
