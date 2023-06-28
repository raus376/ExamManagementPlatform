import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizQuestionsService } from 'src/app/services/quiz-questions.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{
  
  public Editor=ClassicEditor;
  
  qId:any;
  qTitle:any;

  question={
    quiz:{
    qid:'',
    },
    content:'',
    option_1:'',
    option_2:'',
    option_3:'',
    option_4:'',
    answer:''
  }

  constructor(private _route:ActivatedRoute,private _quiz:QuizQuestionsService){}
  
  
  ngOnInit(): void {
   this.qId= this._route.snapshot.params['qid'];
   this.question.quiz['qid']=this.qId;
   this.qTitle=this._route.snapshot.params['title'];
  }


  formSubmit(){
   
    if(this.question.content.trim()==null || this.question.content==''){
      Swal.fire({
        title: 'Content Required',
        icon: 'error',
        showConfirmButton: true,
        timer: 2500 // 4 seconds
      })
      return;
    }

    if(this.question.option_1.trim()==null || this.question.option_1==''){
      Swal.fire({
        title: 'Option_1 Required',
        icon: 'error',
        showConfirmButton: true,
        timer: 2500 // 4 seconds
      })
      return
    }

    if(this.question.option_2.trim()==null || this.question.option_2==''){
      Swal.fire({
        title: 'Option_2 Required',
        icon: 'error',
        showConfirmButton: true,
        timer: 2500 // 4 seconds
      })
      return;
    }

    if(this.question.answer.trim()==null || this.question.answer==''){
      Swal.fire({
        title: 'Answer Required',
        icon: 'error',
        showConfirmButton: true,
        timer: 2500 // 4 seconds
      })
      return;
    }

    this._quiz.addQuestion(this.question).subscribe((data)=>{

      Swal.fire({
        title: 'Question Added Successfully ',
        icon: 'success',
        showConfirmButton: true,
        timer: 2500 // 4 seconds
      })
      this.question.content='',
      this.question.option_1='',
      this.question.option_2='',
      this.question.option_3='',
      this.question.option_4='',
      this.question.answer=''
    },(error)=>{
      console.log(error);
      Swal.fire({
        title: 'Error While Adding Question !',
        icon: 'error',
        showConfirmButton: true,
        timer: 2500 // 4 seconds
      })
    })
   
  }
}
