import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commentaire } from 'src/app/models/commentaire';
import { CommentaireService } from 'src/app/services/commentaire.service';

@Component({
  selector: 'app-liste-commentaire',
  templateUrl: './liste-commentaire.component.html',
  styleUrls: ['./liste-commentaire.component.css']
})
export class ListeCommentaireComponent implements OnInit {
  commentaires: Commentaire[]=[];
  isAdmin: boolean = true;
  constructor(private commentaireService: CommentaireService) { }
  ngOnInit(): void {
    this.loadCommentaires();
  }
  loadCommentaires() {
    this.commentaireService.getCommentaires().subscribe(commentaires => {
      this.commentaires = commentaires;
    });
  }
 
  enregistrerReponse(commentaireId: string, reponse: string): void {
    this.commentaireService.enregistrerReponse(commentaireId, reponse).subscribe(
      () => {
        // Succès : Faites quelque chose si nécessaire après l'enregistrement de la réponse
        console.log('Réponse enregistrée avec succès');
      },
      (error) => {
        // Gestion des erreurs : Affichez ou traitez les erreurs ici
        console.error('Erreur lors de l\'enregistrement de la réponse : ', error);
      }
    );
  }





  
 
  }

