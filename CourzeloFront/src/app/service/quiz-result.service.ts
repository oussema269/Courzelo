import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizResultService {
  private results: { score: number; questions: any[] };

  constructor() { }

  public storeResults(score: number, questions: any[]): void {
    this.results = { score, questions };
  }

  public getResults(): { score: number; questions: any[] } {
    return this.results;
  }
}
