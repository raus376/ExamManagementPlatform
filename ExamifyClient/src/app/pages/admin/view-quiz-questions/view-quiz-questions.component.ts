import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizQuestionsService } from 'src/app/services/quiz-questions.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{

  qId:any;
  qTitle:any;
  question:any=[];

  constructor(private _route:ActivatedRoute,private _quizQuestion:QuizQuestionsService){ }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];

    this._quizQuestion.getQuestionsOfQuiz(this.qId).subscribe((data:any)=>{
           console.log(data);
           this.question=data;
    },(error)=>{

    })
  }

}
