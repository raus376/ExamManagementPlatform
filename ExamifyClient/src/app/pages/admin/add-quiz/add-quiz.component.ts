import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{
  
  constructor(private _category:CategoryService,private _quiz:QuizService){};

  categories:any=[];
  
  quizData={
    title:'',
    description:'',
    maxMark:'',
    numberOfQuestions:'',
    isActive:true,
    category:{
      cid:''
    }
  }
  
  
  ngOnInit(): void {
    this._category.category().subscribe((data:any)=>{
      this.categories=data;
    },
    (error)=>{
      Swal.fire("Server Error !");
      console.log(error);
    })
  }

  public addQuiz(){
    
    if(this.quizData.title.trim()=='' || this.quizData.title==null){
      Swal.fire({
        title: 'Title Required',
        icon: 'error',
        showConfirmButton: true,
        timer: 2500 // 4 seconds
      })
    }

    if(this.quizData.description.trim()=='' || this.quizData.description==null){
      Swal.fire({
        title: 'Description Required',
        icon: 'error',
        showConfirmButton: true,
        timer: 2500 // 4 seconds
      })
  }

  if(this.quizData.maxMark=='' || this.quizData.maxMark==null){
    Swal.fire({
      title: 'Maximum_Marks Required',
      icon: 'error',
      showConfirmButton: true,
      timer: 2500 // 4 seconds
    })
}

if(this.quizData.numberOfQuestions=='' || this.quizData.numberOfQuestions==null){
  Swal.fire({
    title: 'Number_Of_Questions Required',
    icon: 'error',
    showConfirmButton: true,
    timer: 2500 // 4 seconds
  })
}

if(this.quizData.category.cid=='' || this.quizData.category.cid==null){
  Swal.fire({
    title: 'Category Required !',
    icon: 'error',
    showConfirmButton: true,
    timer: 2500 // 4 seconds
  })
}


 this._quiz.addQuiz(this.quizData).subscribe((data)=>{
  
  this.quizData={
    title:'',
    description:'',
    maxMark:'',
    numberOfQuestions:'',
    isActive:true,
    category:{
      cid:''
    }
  }
  
  Swal.fire({
    title: 'Quiz Added Successfully',
    icon: 'success',
    showConfirmButton: true,
    timer: 2500 // 4 seconds
  })
 },
 (error)=>{
  console.log(error);
  Swal.fire({
    title: 'Server Error !',
    icon: 'error',
    showConfirmButton: true,
    timer: 2500 // 4 seconds
  })
 })

  }

}
