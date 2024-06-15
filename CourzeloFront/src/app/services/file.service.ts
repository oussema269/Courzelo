import { Injectable } from '@angular/core';
import {HttpClient}from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl='http://localhost:8282/Domaine'
  constructor(private http:HttpClient) { }
  uploadPhoto(id: string, file: File): Observable<any> {
    const uploadUrl = `${this.baseUrl}/upload/${id}`;

    const formData: FormData = new FormData();
    formData.append('photo', file, file.name);

    return this.http.post(uploadUrl, formData);
    
  
}
getPhoto(photo: any): string{
  const photoUrl = `${this.baseUrl}/download/${photo}`;

  return `${this.baseUrl}/download/${photo}`;
}
}
