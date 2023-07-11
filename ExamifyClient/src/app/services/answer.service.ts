import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private _http: HttpClient) { }



  public addAnswer(answer: any) {
    return this._http.post(`${baseUrl}/answer/save`, answer);
  }
}
