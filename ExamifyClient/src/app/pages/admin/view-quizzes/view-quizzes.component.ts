import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{
 
  quizzes:any=[];
 
 
  constructor(private _quiz:QuizService,private _router:Router){}
  ngOnInit(): void {
   this._quiz.quizzes().subscribe((data:any)=>{
    this.quizzes=data;
   },(error)=>{
    Swal.fire('Server Error !')
   })
  }

  //delete quiz
  deleteQuiz(qId:any){
    Swal.fire({
      icon:'info',
      'title':"Sure to Delete ?",
      confirmButtonText:'Delete',
      showCancelButton:true
    }).then((result)=>{

      if(result.isConfirmed){
        this._quiz.deleteQuiz(qId).subscribe((data:any)=>{
         
          Swal.fire({
            title: 'Quiz Deleted Successfully',
            icon: 'success',
            showConfirmButton: true,
            timer: 2500 // 4 seconds
          }).then(()=>{ // ,
            window.location.reload();
          })
          
         },(error)=>{
          console.log(error);
          Swal.fire("Server Error !");
         })
      }
    })
}
  }


