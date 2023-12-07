import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import { Subject } from './subject';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiBaseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.apiBaseUrl + "/subjects");
  }

  // getParentTitle(parentId: number): Observable<string> {
  //   return this.getSubjects().pipe(
  //     map(subjects => {
  //       const parent = subjects.find(subject => subject.subject_id === parentId);
  //       return parent ? parent.title : '';
  //     })
  //   );
  // }

  public deleteSubject(subjectId: number): Observable<any> {
    console.log('Deleting subject with ID:', subjectId);
    return this.http.delete<any>(`${this.apiBaseUrl}/subjects/${subjectId}`);
  }

  updateSubject(subjectId: number, updatedSubject: any): Observable<Subject> {
    const url = `${this.apiBaseUrl}/subjects/${subjectId}`;
    console.log(updatedSubject);
    return this.http.put<Subject>(url, updatedSubject);
  }
  addSubject(addedSubject: any): Observable<Subject> {
    console.log(addedSubject);
    return this.http.post<Subject>(`${this.apiBaseUrl}/subjects`, addedSubject);
  }
}
