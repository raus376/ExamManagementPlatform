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

  //get quiz by quizId
  public getQuiz(quizId:any){
    return this._http.get(`${baseUrl}/quiz/get/${quizId}`)
  }

   //update quiz by quizId
   public updateQuiz(quiz:any){
    return this._http.put(`${baseUrl}/quiz/update`,quiz);
  }

  //update quiz by categoryId
  public getQuizzesOfCategory(cId:any){
    return this._http.get(`${baseUrl}/quiz/category/${cId}`);
  }

  //get Active quizzes
  public getActiveQuizzes(){
    return this._http.get(`${baseUrl}/quiz/getActive`)
  }

  //get Active quizzes of category
  public getActiveQuizzesOfCategory(cId:any){
    return this._http.get(`${baseUrl}/quiz/active/category/${cId}`);
  }
}
