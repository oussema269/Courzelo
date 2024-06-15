import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Question } from '../model/Question.model';
import { TokenStorageService } from './token-storage-service.service';

@Injectable({
    providedIn: 'root'
  })
  export class QuestionService {

    private baseURL = "http://localhost:8282/question";

    constructor(private httpClient: HttpClient,private tokenStorageService :TokenStorageService ) { }
    httpOptions = {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
          'Content-Type': 'application/json'
      })
  };
  
  getQuestionList(): Observable<any>{ //any ?
    return this.httpClient.get(`${this.baseURL}`+'/allQuestions',this.httpOptions);
  }
  getCategory(): Observable<any>{ //any ?
    return this.httpClient.get(`${this.baseURL}`+'/category/{category}',this.httpOptions);
  }
  getDifficultylevel(): Observable<any>{ //any ?
    return this.httpClient.get(`${this.baseURL}`+'/difficultylevel/{difficultylevel}',this.httpOptions);
  }

  /*createQuestion(question: Question): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, question);
  }*/
  addQuestion(questionData: any): Observable<any> {
   
    return this.httpClient.post(`${this.baseURL}`+'/add', questionData,  this.httpOptions );
  }
  
  getAllQuestions(): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/allQuestions`,this.httpOptions);
  }
  /*getQuestionById(id: string): Observable<Question>{
    return this.httpClient.get<Question>(`${this.baseURL}/${id}`);
  }*/

  updateQuestion(id: string, question: Question): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/update/${id}`, question,this.httpOptions);
  }

  deleteQuestion(id: string): Observable<any>{
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`,this.httpOptions);
  }

  deleteTest(id : string) : Observable<any>{
    return this.httpClient.delete(`${this.baseURL}/hedhyDelete/${id}`, {responseType:"text"})
  }

  getQuestionById(id : String): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/difficultylevel/${id}`,this.httpOptions);
  }
}