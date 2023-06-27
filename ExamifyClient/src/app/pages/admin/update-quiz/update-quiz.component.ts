import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route: ActivatedRoute,private _quiz:QuizService,private _category:CategoryService,private _navigateRoute:Router) { }

  qId: any = 0;
  quiz:any;
  categories:any;

  ngOnInit(): void { 
    this.qId = this._route.snapshot.params['qid'];
   
    this._quiz.getQuiz(this.qId).subscribe((data)=>{
      this.quiz=data;

    },
    (error)=>{
      console.log(error);
      Swal.fire("Server Error !");
    })

    //get All category
    this._category.category().subscribe((data:any)=>{
      this.categories=data;
    },
    (error)=>{
      Swal.fire("Server Error !");
      console.log(error);
    })
  
  }


  public updateQuiz(){
    
    if(this.quiz.title.trim()=='' || this.quiz.title==null){
      Swal.fire({
        title: 'Title Required',
        icon: 'error',
        showConfirmButton: true,
        timer: 2500 // 4 seconds
      })
      return;
    }

    if(this.quiz.description.trim()=='' || this.quiz.description==null){
      Swal.fire({
        title: 'Description Required',
        icon: 'error',
        showConfirmButton: true,
        timer: 2500 // 4 seconds
      })
      return;
  }

  if(this.quiz.maxMarks=='' || this.quiz.maxMarks==null){
    Swal.fire({
      title: 'Maximum_Marks Required',
      icon: 'error',
      showConfirmButton: true,
      timer: 2500 // 4 seconds
    })
    return;
}

if(this.quiz.numberOfQuestions=='' || this.quiz.numberOfQuestions==null){
  Swal.fire({
    title: 'Number_Of_Questions Required',
    icon: 'error',
    showConfirmButton: true,
    timer: 2500 // 4 seconds
  })
  return;
}

if(this.quiz.category.cid=='' || this.quiz.category.cid==null){
  Swal.fire({
    title: 'Category Required !',
    icon: 'error',
    showConfirmButton: true,
    timer: 2500 // 4 seconds
  })
  return;
}

//updating quiz

this._quiz.updateQuiz(this.quiz).subscribe((data:any)=>{
  
  Swal.fire({
    title: 'Quiz Updated Successfully',
    icon: 'success',
    showConfirmButton: true,
    timer: 2500 // 4 seconds
  }).then(()=>{
    this._navigateRoute.navigate(['/admin/quizzes']);
  })
 },
 (error)=>{
  console.log(error);
  Swal.fire({
    title: 'Server Error while Updating Quiz !',
    icon: 'error',
    showConfirmButton: true,
    timer: 2500 // 4 seconds
  })
 })


  }

  
}
