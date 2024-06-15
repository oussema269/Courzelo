import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from '../ClassClass/class';

@Injectable({
  providedIn: 'root'
})
export class ClassServiceService {

  private baseUrl='http://localhost:8282/class'

   createClass(classData: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.baseUrl}`+'/addClass', classData, { headers });
  }
  constructor(private http:HttpClient) { }
  getClassList(): Observable<any> {  
    return this.http.get(`${this.baseUrl}`+'/getAllClasses');  
  }  
   
  getClass(id: string): Observable<Class> {  
    return this.http.get<Class>(`${this.baseUrl}/getClassById/${id}`);  
  }  
}
