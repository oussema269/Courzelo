import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient}from "@angular/common/http";
import { Faculte } from '../FaculteClass/faculte';
@Injectable({
  providedIn: 'root'
})
export class FaculteService {

  private baseUrl='http://localhost:8282/Faculte'

  constructor(private http:HttpClient) { }
  getFaculteList(): Observable<Faculte[]> {  
    return this.http.get<Faculte[]>(`${this.baseUrl}`+'/getAllFacultes');  
  }  
  
  createFaculte(faculteData: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.baseUrl}`+'/addFaculte', faculteData, { headers });
  }
  
  deleteFaculte(id: String): Observable<any> {  
    return this.http.delete(`${this.baseUrl}/deleteFaculte/${id}`, { responseType: 'text' });  
  }  
  getFaculte(id: String): Observable<Faculte> {  
    return this.http.get<Faculte>(`${this.baseUrl}/getDetailsFaculte/${id}`);  
  }  

  
  updateFaculte(id: String, faculte: Faculte): Observable<Object> {  
    return this.http.put(`${this.baseUrl}/modifierFaculte/${id}`, faculte);  
  }  
  uploadPhoto(id: string, file: File): Observable<any> {
    const uploadUrl = `${this.baseUrl}/uploadfaculte/${id}`;

    const formData: FormData = new FormData();
    formData.append('photo', file, file.name);

    return this.http.post(uploadUrl, formData);
  }
  downloadFile(fileName: string): Observable<Blob> {
    const url = `${this.baseUrl}/downloadfaculte/${fileName}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  getPhoto(photo: String): string{
    const photoUrl = `${this.baseUrl}/downloadfaculte/${photo}`;

    return `${this.baseUrl}/downloadfaculte/${photo}`;
  }
  addFaculteToPole(id: string,faculte: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.baseUrl}`+`/addFaculteToPole/${id}`, faculte, { headers });
  }
  getFaculteByPoleId(id:string):Observable<Faculte>{
    return this.http.get<Faculte>(`${this.baseUrl}/getFaculteByPoleId/${id}`);  
  }

  //youssef 

  getAllfaculte(): Observable<Object>{
    return this.http.get(`${this.baseUrl}`+'/getAllFacultes');  

  }
  getFaculteByname(name:string): Observable<Object>{
    return this.http.get(`${this.baseUrl}/getfaculteByNom/${name}`);  

  }

}
