import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient}from "@angular/common/http";
import { PoleClass } from '../PoleClass/pole-class';
import { Faculte } from 'src/app/Faculte/FaculteClass/faculte';
@Injectable({
  providedIn: 'root'
})
export class PoleServiceService {

  private baseUrl='http://localhost:8282/Pole'
constructor(private http:HttpClient) { }
getPoleList(): Observable<any> {  
  return this.http.get(`${this.baseUrl}`+'/getAllPoles');  
}  
  
createPole(poleData: any): Observable<any> {
  const headers = { 'Content-Type': 'application/json' };
  return this.http.post(`${this.baseUrl}`+'/addPole', poleData, { headers });
}
  
deletePole(id: String): Observable<any> {  
  return this.http.delete(`${this.baseUrl}/deletePole/${id}`, { responseType: 'text' });  
}  
getPole(id: string): Observable<PoleClass> {  
  return this.http.get<PoleClass>(`${this.baseUrl}/getDetailsPole/${id}`);  
}  

  
// getBlog(id: string): Observable<Faculte> {  
  // return this.http.get<Faculte>(`${this.baseUrl}/getDetailsBlog/${id}`);  
// }  
  
updatePole(id: String, pole: PoleClass): Observable<Object> {  
  return this.http.put(`${this.baseUrl}/modifierPole/${id}`, pole);  
}  
uploadPhoto(id: string, file: File): Observable<any> {
  const uploadUrl = `${this.baseUrl}/uploadpole/${id}`;
  const formData: FormData = new FormData();
  formData.append('photo', file, file.name);
  return this.http.post(uploadUrl, formData);
}
downloadFile(fileName: string): Observable<Blob> {
  const url = `${this.baseUrl}/downloadpole/${fileName}`;
  return this.http.get(url, { responseType: 'blob' });
}
getPhoto(photo: String): string{
  const photoUrl = `${this.baseUrl}/downloadpole/${photo}`;
  return `${this.baseUrl}/downloadpole/${photo}`;
}
affecterFaculteApole(id:string , faculte:Faculte){
  return this.http.post(`${this.baseUrl}/affecterFaculteApole/${id}`,faculte);
}

}
