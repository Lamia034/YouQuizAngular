import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import { Question } from './question';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiBaseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiBaseUrl + "/questions");
  }

  public deleteQuestion(questionId: number): Observable<any> {
    console.log('Deleting question with ID:', questionId);
    return this.http.delete<any>(`${this.apiBaseUrl}/questions/${questionId}`);
  }

  updateQuestion(questionId: number, updatedQuestion: any): Observable<Question> {
    const url = `${this.apiBaseUrl}/questions/${questionId}`;
    console.log(updatedQuestion);
    return this.http.put<Question>(url, updatedQuestion);
  }
  addQuestion(addedQuestion: any): Observable<Question> {
    console.log(addedQuestion);
    return this.http.post<Question>(`${this.apiBaseUrl}/questions`, addedQuestion);
  }
}
