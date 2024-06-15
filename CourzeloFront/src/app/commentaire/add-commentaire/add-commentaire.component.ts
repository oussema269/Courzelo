import { Component } from '@angular/core';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Commentaire } from 'src/app/models/commentaire';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-commentaire',
  templateUrl: './add-commentaire.component.html',
  styleUrls: ['./add-commentaire.component.css']
})
export class AddCommentaireComponent {
  email= ''; 
  subject= 'Confirmation de votre commentaire'; 
  corp= 'Cher Utilisateur, vous venez de postez un commentaire sur notre platforme, nous vous encourage pour votre interaction '; 
  addCommentaireForm:FormGroup;
  constructor(private commentaireService: CommentaireService,private formBuilder: FormBuilder, private router: Router) { 
    this.addCommentaireForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      corp: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.addCommentaireForm.valid) {
      const CommentaireData: Commentaire = this.addCommentaireForm.value;
      this.commentaireService.addCommentaire(CommentaireData).subscribe(
        response => {
          alert('Commentaire ajouté avec succès !');
          this.addCommentaireForm.reset();
        },
        error => {
          alert('Une erreur est survenue lors de l\'ajout du Commentaire.');
        }
      );
    } else {
      alert('Veuillez remplir correctement tous les champs.');
    }
   
  }
  sendEmail() {
    
    const CommentaireData: Commentaire = this.addCommentaireForm.value;
    if (CommentaireData.email) {
      this.email = CommentaireData.email;
  
     
      
    this.commentaireService.sendEmail(this.email, this.subject, this.corp).subscribe(
      response => {
        console.log('Email envoyé avec succès :', response);
        // Traitez la réponse de l'API
      },
      error => {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        // Gérez l'erreur
      }
    );
  }
}
}

