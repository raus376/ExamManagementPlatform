import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizQuestionsService {

  constructor(private _http: HttpClient) { }

  public getQuestionsOfQuiz(quizId: any) {
    return this._http.get(`${baseUrl}/question/getAll/quiz/${quizId}`)
  }

  public getQuestionsOfQuizForTest(quizId: any) {
    return this._http.get(`${baseUrl}/question/quiz/${quizId}`)
  }

  //adding question
  public addQuestion(question: any) {
    return this._http.post(`${baseUrl}/question/create`, question);
  }

  //delete question
  public deleteQuestion(qId: any) {
    return this._http.delete(`${baseUrl}/question/delete/${qId}`);
  }

  //evaluate quiz
  public evaluateQuiz(questions: any) {
    return this._http.post(`${baseUrl}/question/evaluate/quiz`, questions);
  }

  public updateQuestion(question:any){
    return this._http.put(`${baseUrl}/question/update`,question);
  }

  public getQuestionByQuestionId(qId:any){
    return this._http.get(`${baseUrl}/question/get/${qId}`);
  }

  


}
