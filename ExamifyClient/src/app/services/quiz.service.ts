import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  // get All Quize
  public quizzes(){
    return this._http.get(`${baseUrl}/quiz/getAll`)
  }

  //create Quiz
  public addQuiz(quiz:any){
    return this._http.post(`${baseUrl}/quiz/create`,quiz);
  }

  //delete QUiz
  public deleteQuiz(quizId:any){
    return this._http.delete(`${baseUrl}/quiz/delete/${quizId}`);
  }
}
