import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/model/Question.model';
import { QuestionService } from 'src/app/service/question.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  question: Question = new Question();
  constructor(private questionService: QuestionService,
    private router: Router) { }

  ngOnInit(): void {
  }
 /* saveQuestion(){
    this.questionService.addQuestion(this.question).subscribe( data =>{
      console.log(data);
      this.goToQuestionList();
    },
    error => console.log(error));
  }

  goToQuestionList(){
    this.router.navigate(['/question']);
  }
  */
  onSubmit(){
    this.questionService.addQuestion(this.question).subscribe(() => {
      console.log('Question ajoutée avec succès!');
      this.router.navigate(['/question-list']);
    }, error => {
      console.error('Erreur lors de l\'ajout de la question:', error);
    });
  }

  /*addquestion() {
    this.questionService.createQuestion(this.question).subscribe({
      next: (question) => {
        this.posts.push(post); // Ajoute le nouveau post à la liste des posts
        this.newPost = { titre: '', contenu: '' }; // Réinitialise le formulaire pour un nouveau post
      },
      error: (error) => console.error("Erreur lors de l'ajout du post", error)
    });
  }*/

}
