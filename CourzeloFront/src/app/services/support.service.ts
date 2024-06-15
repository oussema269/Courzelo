// support.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Support } from '../models/support.model';


@Injectable({
  providedIn: 'root'
})
export class SupportService {

  private url = 'http://localhost:8282/reclamation';

  constructor(private httpClient: HttpClient) {}

  createSupport(support  :  any): Observable<any> { // Change parameter type to 'support'
    return this.httpClient.post(this.url + '/addReclamation', support); // Pass 'supportData' directly
  }
  getAllSupports(): Observable<Support[]> {
    return this.httpClient.get<Support[]>(`${this.url}/getAllReclamations`);
  }

  updateSupport(support: Support): Observable<any> {
    return this.httpClient.put(`${this.url}/updateRclamation`, support);
  }

  deleteSupport(id: string): Observable<any> {
    return this.httpClient.delete(`${this.url}/deleteReclamation/${id}`);
  }
  getReclamationById(reclamationId: string): Observable<Support> {
    return this.httpClient.get<Support>(`${this.url}/getReclamationById/${reclamationId}`);
  }
  searchReclamationsByTitle(title: string): Observable<Support[]> {
    return this.httpClient.get<Support[]>(`${this.url}/searchByTitle?title=${title}`);
}
getAllReclamationsSort(): Observable<Support[]> {
  return this.httpClient.get<Support[]>(`${this.url}/getAllReclamationsSortedByTitle`);
}

  
}
