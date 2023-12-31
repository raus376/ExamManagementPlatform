import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuizQuestionsService } from 'src/app/services/quiz-questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{

  qId:any;
  qTitle:any;
  question:any=[];

  constructor(private _route:ActivatedRoute,private _quizQuestion:QuizQuestionsService,private _navigateRoute:Router,private _login:LoginService){ }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];

    this._quizQuestion.getQuestionsOfQuiz(this.qId).subscribe((data:any)=>{
           console.log(data);
           this.question=data;
    },(error)=>{

    })
  }

  //delete Question

  deleteQuestion(qId:any){
  
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Sure to Delelte ?'
    }).then((result)=>{
      if(result.isConfirmed){

        //checking role for deleting quiz
        // if (this._login.getUserRole() == 'ROLE_NORMAL' || this._login.getUserRole()=='ROLE_ORGANIZATION') {
        //   Swal.fire({
        //     title: 'You Logged as an Organization, You are not authorize to delete Question ! For more Connect Admin => raushan376kumar@gmail.com',
        //     icon: 'error',
        //     showConfirmButton: true,
        //     timer: 20000 // 4 seconds
        //   })
        //   return;
        // }

        this._quizQuestion.deleteQuestion(qId).subscribe((data)=>{
          Swal.fire({
            title: 'Question Deleted Successfully',
            icon: 'success',
            showConfirmButton: true,
            timer: 2500 // 4 seconds
          }).then(()=>{
            window.location.reload();
          })
        }, (error)=>{
          console.log(error);
          Swal.fire("Error While Deleting Question !");
        })
      }
    })
  }


  updateQuestion(qId:any){
    this._navigateRoute.navigate(['admin/update-question',qId]);
   }
}
