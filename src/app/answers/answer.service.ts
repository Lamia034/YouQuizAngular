import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { Answer } from './answer';


@Injectable({
  providedIn: 'root'
})
export class AnswerService {
    private apiBaseUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {
    }

    public getAnswers(): Observable<Answer[]> {
        return this.http.get<Answer[]>(this.apiBaseUrl + "/answers");
    }

    public deleteAnswer(answerId: number): Observable<any> {
        console.log('Deleting answer with ID:', answerId);
        return this.http.delete<any>(`${this.apiBaseUrl}/answers/${answerId}`);
    }

    updateAnswer(answerId: number, updatedText: string): Observable<Answer> {
        const url = `${this.apiBaseUrl}/answers/${answerId}`;
        const updatedAnswer = {text: updatedText};

        return this.http.put<Answer>(url, updatedAnswer);
    }

    addAnswer(answerText: string): Observable<Answer> {
        const requestBody = {text: answerText};

        return this.http.post<Answer>(`${this.apiBaseUrl}/answers`, requestBody);
    }
}

