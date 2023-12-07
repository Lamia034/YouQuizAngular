// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import {map, Observable, tap} from 'rxjs';
// import { Media } from './media';
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class MediaService {
//   private apiBaseUrl = 'http://localhost:8080';
//
//   constructor(private http: HttpClient) {
//   }
//
//   public getMedias(): Observable<Media[]> {
//     return this.http.get<Media[]>(this.apiBaseUrl + "/medias");
//   }
//
//
//   public deleteMedia(mediaId: number): Observable<any> {
//     console.log('Deleting media with ID:', mediaId);
//     return this.http.delete<any>(`${this.apiBaseUrl}/medias/${mediaId}`);
//   }
//
//   updateMedia(mediaId: number, updatedMedia: any): Observable<Media> {
//     const url = `${this.apiBaseUrl}/medias/${mediaId}`;
//     console.log(updatedMedia);
//     return this.http.put<Media>(url, updatedMedia);
//   }
//   addMedia(addedMedia: any): Observable<Media> {
//     console.log(addedMedia);
//     return this.http.post<Media>(`${this.apiBaseUrl}/medias`, addedMedia);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import { Media } from './media';


@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiBaseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public getMedias(): Observable<Media[]> {
    return this.http.get<Media[]>(this.apiBaseUrl + "/medias");
  }

  public deleteMedia(mediaId: number): Observable<any> {
    console.log('Deleting media with ID:', mediaId);
    return this.http.delete<any>(`${this.apiBaseUrl}/medias/${mediaId}`);
  }

  updateMedia(mediaId: number, updatedMedia: any): Observable<Media> {
    const url = `${this.apiBaseUrl}/medias/${mediaId}`;
    console.log(updatedMedia);
    return this.http.put<Media>(url, updatedMedia);
  }
  addMedia(addedMedia: any): Observable<Media> {
    console.log(addedMedia);
    return this.http.post<Media>(`${this.apiBaseUrl}/medias`, addedMedia);
  }
}
