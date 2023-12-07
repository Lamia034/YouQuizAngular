import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { Level } from './level';


@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private apiBaseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public getLevels(): Observable<Level[]> {
    return this.http.get<Level[]>(this.apiBaseUrl + "/levels");
  }

  public deleteLevel(levelId: number): Observable<any> {
    console.log('Deleting level with ID:', levelId);
    return this.http.delete<any>(`${this.apiBaseUrl}/levels/${levelId}`);
  }

  updateLevel(levelId: number, updatedLevel: any): Observable<Level> {
    const url = `${this.apiBaseUrl}/levels/${levelId}`;
    console.log(updatedLevel);
    return this.http.put<Level>(url, updatedLevel);
  }
  addLevel(addedLevel: any): Observable<Level> {
    return this.http.post<Level>(`${this.apiBaseUrl}/levels`, addedLevel);
  }
}
