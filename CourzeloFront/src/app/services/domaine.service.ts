import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Domaine } from '../models/domaine';


@Injectable({
  providedIn: 'root'
})
export class DomaineService {
  private apiUrl = 'http://localhost:8282/Domaine/Domaine';
  private saveUrl: string = 'http://localhost:8282/Domaine/addDomaine';
  private usersUrl: string;
  private updateUrl: string = 'http://localhost:8282/Domaine/Domaine'
  
  

  constructor(private http: HttpClient) {  this.usersUrl = 'http://localhost:8282/Domaine/Domaines'}
  
  
  getDomaines(): Observable<Domaine[]> {
    return this.http.get<Domaine[]>('http://localhost:8282/Domaine/Domaines');
  }

  deleteDomaine(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
}
saveDomaine(domaine: Domaine): Observable<Domaine> {
  return this.http.post<Domaine>(this.saveUrl, domaine);
}
public findAll(): Observable<Domaine[]> {
  return this.http.get<Domaine[]>(this.usersUrl);

}
updateDomaine(domaine: Domaine, id:any): Observable<Domaine> {
  const url = `${this.updateUrl}/${id}`;
  return this.http.put<Domaine>(url, domaine);
}
getDomaine(id: string): Observable<Domaine> {
const url = `http://localhost:8282/Domaine/dd/${id}`;
return this.http.get<Domaine>(url);
}
getPhoto(photo: string): string{
  const photoUrl = `${this.updateUrl}/download/${photo}`;

  return `${this.updateUrl}/download/${photo}`;
}
}








