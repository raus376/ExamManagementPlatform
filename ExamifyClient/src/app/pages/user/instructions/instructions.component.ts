import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{
  
  qId:any;
  quizData:any;

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _r:Router){}
  
  ngOnInit(): void {
  this.qId= this._route.snapshot.params['qId'];

  this._quiz.getQuiz(this.qId).subscribe((data)=>{
   this.quizData=data;

  },(error)=>{
    console.log(error);
    Swal.fire("Error While Loading Quiz ! Server Error !");
  })
  }

  public startQuiz(){
   
    Swal.fire({
      title:'Sure to Start ?',
      showDenyButton:false,
      showCancelButton:true,
      showConfirmButton:true,
      denyButtonText:'Exit !',
      icon:'info'
    }).then((result)=>{
        
      if(result.isConfirmed){
        this._r.navigate(['/start/'+this.qId]);
      }else{
        Swal.fire("Denied !");
      }
    })
  }

}
