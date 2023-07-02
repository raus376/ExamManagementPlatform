import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{

  categoryId:any;
  quizzes:any;

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _r:Router){}


  ngOnInit(): void { 
   
    this._route.params.subscribe((params)=>{
      this.categoryId=params['cId'];

      if(this.categoryId==0){

        this._quiz.getActiveQuizzes().subscribe((data)=>{
          this.quizzes=data;
          // console.log(this.quizzes);
        },(error)=>{
          console.log(error);
          Swal.fire("Error While Loading All Quizzes ! Server Error !");
        })
      }
      else{
              this._quiz.getActiveQuizzesOfCategory(this.categoryId).subscribe((data)=>{
                this.quizzes=data;
              },
              (error)=>{
                console.log(error);
                Swal.fire("Error while loading quizzes !");
              })
      }
      
    });
 
   
  }


  public startQuiz(qId:any){
   
    Swal.fire({
      title:'Sure to Start ?',
      showDenyButton:false,
      showCancelButton:true,
      showConfirmButton:true,
      denyButtonText:'Exit !',
      icon:'info'
    }).then((result)=>{
        
      if(result.isConfirmed){
        this._r.navigate(['/start/'+qId]);
      }else{
        Swal.fire("Denied !");
      }
    })
  }

}
