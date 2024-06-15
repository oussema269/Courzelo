import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from 'src/app/model/Question.model';
import { Answer } from 'src/app/model/Answers.model';
import { QuestionWrapper } from 'src/app/model/QuestionWrapper.model';
import { TokenStorageService } from './token-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private baseURL = "http://localhost:8282/quiz";

  constructor(private httpClient: HttpClient,private tokenStorageService : TokenStorageService) { }
  httpOptions = {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
        'Content-Type': 'application/json'
    })
};

  createQuiz(quiz: any, num: number, category: string): Observable<string> {
    return this.httpClient.post<string>(`${this.baseURL}/create/${num}/${category}`, quiz, this.httpOptions);
  }

  getQuizQuestions(id: string): Observable<QuestionWrapper[]> {
    return this.httpClient.get<QuestionWrapper[]>(`${this.baseURL}/get/${id}`, this.httpOptions);
  }

  getQuizResult(idQuiz: string, answers: Answer[]): Observable<number> {
    return this.httpClient.post<number>(`${this.baseURL}/getResult/${idQuiz}`, answers, this.httpOptions);
  }
  getQuizList(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/getAll`, this.httpOptions);
  }
}
