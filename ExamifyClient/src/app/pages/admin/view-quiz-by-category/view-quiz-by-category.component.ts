import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-by-category',
  templateUrl: './view-quiz-by-category.component.html',
  styleUrls: ['./view-quiz-by-category.component.css']
})
export class ViewQuizByCategoryComponent implements OnInit{



  quizzes:any=[];
 categoryId:any;
 
  constructor(private activatedRoute:ActivatedRoute, private _quiz:QuizService,private _router:Router,private _login:LoginService){}
  ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe(params=>{
    this.categoryId= params.get('cId');
    console.log(this.categoryId);
  })

  this._quiz.getQuizzesOfCategory(this.categoryId).subscribe((data:any)=>{
    this.quizzes=data;
    console.log(this.quizzes);
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

      //checking role for deleting quiz
      if (this._login.getUserRole() == 'ROLE_NORMAL' || this._login.getUserRole()=='ROLE_ORGANIZATION') {
        Swal.fire({
          title: 'You Logged as an Organization, You are not authorize to delete quiz ! For more Connect Admin => raushan376kumar@gmail.com',
          icon: 'error',
          showConfirmButton: true,
          timer: 20000 // 20 seconds
        })
        return;
      }

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
