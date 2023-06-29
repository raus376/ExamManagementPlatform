import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizQuestionsService } from 'src/app/services/quiz-questions.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  resultData:any;
  qId:any;
  questions:any;
  quizTitle:any

  marksGot=0;
  correctAnswers=0;
  attempted=0;
  resultShow=false;
  

  constructor(private _route:ActivatedRoute,private _queston:QuizQuestionsService,private _quiz:QuizService,private _navigateRoute:Router) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qId=this._route.snapshot.params['qId'];
    this.loadQuestion();
  }

  loadQuestion(){
    this._queston.getQuestionsOfQuizForTest(this.qId).subscribe((data)=>{
      this.questions=data;
      console.log(data);
      this.questions.forEach((q:any)=>{
        q['givenAnswer']='';
      })
    },(error)=>{
      console.log(error);
      Swal.fire('Error','Error while Loading question of quiz','error');
    })
  }

  preventBackButton() {
    history.pushState(null, '', location.href);

    window.onpopstate = () => {
      history.pushState(null, '', location.href);
    };
  }

  submitQuiz(){
    Swal.fire({
      title:'Sure to Submit ?',
      showDenyButton:false,
      showCancelButton:true,
      showConfirmButton:true,
      denyButtonText:'Exit !',
      icon:'info'
    }).then((result)=>{
            
      if(result.isConfirmed){
console.log(this.questions);
this.questions.forEach((q:any)=>{
  if(q.answer==q.givenAnswer){
    console.log(q.answer+" "+this.questions[0].quiz.maxMarks);
    this.correctAnswers++;
  let marksSingle=  this.questions[0].quiz.maxMarks/this.questions.length;
    this.marksGot+=marksSingle;
  }

  if(q.givenAnswer.trim()!=''){
    this.attempted++;
  }
  
})
console.log("c"+this.correctAnswers);
  console.log("g"+this.marksGot+" "+this.attempted);

  this.resultData={
    marksObtained:this.marksGot,
    totalAttempted:this.attempted,
    correctAns:this.correctAnswers,
    quizTitle:this.questions[0].quiz.title
  }

  
  this._navigateRoute.navigate(['show-result'], { queryParams: this.resultData });

      }else{
        Swal.fire("Denied !");
      }
    })
  }

}
