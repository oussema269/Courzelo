import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { TokenStorageService } from './token-storage-service.service';

@Injectable()
export class VideoService { 
  private apiUrl = ' http://localhost:8282/Courzelou/cour' ; // Mettez l'URL correcte de votre API

  constructor(private http: HttpClient,private tokenStorageService: TokenStorageService ) { }
  httpOptions = {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
        'Content-Type': 'application/json'
    })
};

  getVideo(title: string ) {

    return this.http.get(`${this.apiUrl}/video/${title}` ,this.httpOptions);
  }
}
