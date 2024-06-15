import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ressource } from '../model/Ressource';
import { TokenStorageService } from './token-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class RessourceService {

  url='http://localhost:8282/cour'

  constructor(private http: HttpClient,private tokenStorageService : TokenStorageService ) { }
  httpOptions = {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
        'Content-Type': 'application/json'
    })
};
  deleteRessource(id:string){
    return this.http.delete(`${this.url}/supprimerRessource/${id}`,this.httpOptions);

  }
  modifierRessource(id:string , Ressource:Ressource){
    return this.http.put(`${this.url}/modifierCour/${id}`,Ressource,this.httpOptions);
  }
  

  
}
