import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commentaire } from '../models/commentaire';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private baseUrl = 'http://localhost:8282/Commentaire/addCommentaire'; 
  private baseUrl1 = 'http://localhost:8282/Commentaire/Commentaires'; 
  private baseUrl2 = 'http://localhost:8282/Commentaire/Commentaire'; 
  

  constructor(private http: HttpClient) { }
  addCommentaire(commentaire: Commentaire): Observable<Commentaire> {
    return this.http.post<Commentaire>(this.baseUrl, commentaire);
  }
  getCommentaires(): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(this.baseUrl1);
}
deleteCommentaire(commentaireId: string): Observable<void> {
  const url = `${this.baseUrl2}/${commentaireId}`;
  return this.http.delete<void>(url);
}
updateCommentaire(commentaireId: string, updatedCommentaire: Commentaire): Observable<Commentaire> {
  const url = `${this.baseUrl2}/${commentaireId}`;
  return this.http.put<Commentaire>(url, updatedCommentaire);
}
getCommentaire(id: string): Observable<Commentaire> {
  const url = `http://localhost:8282/Commentaire/cc/${id}`;
  return this.http.get<Commentaire>(url);
  }

    enregistrerReponse(commentaireId: string, reponse: string): Observable<any> {
      const url = `http://localhost:8282/Commentaire/${commentaireId}/reponse`;
      return this.http.post(url, reponse);
    }
    
      sendEmail(email: string, subject: string, corp: string): Observable<any> {
        const request = {
          email: email,
          subject: subject,
          corp: corp
        };
        
        return this.http.post<any>('http://localhost:8282/send-email', request);
      }
    }

    
    
  

