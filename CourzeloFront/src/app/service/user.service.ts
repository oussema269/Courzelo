import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { User } from '../shared/model/user.model';
import { TokenStorageService } from './token-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = environment.api_Url+'user';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  httpOptions = {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
        'Content-Type': 'application/json'
    })
};

//get All teacher :
getUser(role: any) {
  return this.http.get(`${this.apiURL}/${role}`, this.httpOptions);
}
getUserById(id: number): Observable<User> {
  return this.http.get<User>(`${this.apiURL}/${id}`, this.httpOptions);
}
deleteUser(): Observable<void> {
  return this.http.delete<void>(`${this.apiURL}/delete`, this.httpOptions );
}



}
(window as any).UserService = UserService;