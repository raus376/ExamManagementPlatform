import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuizQuestionsService } from 'src/app/services/quiz-questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit{
 
  public Editor=ClassicEditor;
  
  qId:any;
  question:any={ 
    "quesId": 0,
     "content": '',
      "image":'',
     "option_1": '',
     "option_2": '',
     "option_3": '',
     "option_4": '',
      "answer": '',
     "givenAnswer": '',
     "quiz": { "title": '',
     "description": '', 
     "maxMarks": 0, 
     "numberOfQuestions": 0, 
     "isActive": true, 
     "category": {
       "title": '', 
       "description": '', 
       "cid": 0 },
        "qid": 0 } 
      }


  constructor(private _questionService:QuizQuestionsService, private activatedRoute:ActivatedRoute){};
 
  ngOnInit(): void {

    this.qId=this.activatedRoute.snapshot.params['qId'];
    console.log(this.qId);


     this._questionService.getQuestionByQuestionId(this.qId).subscribe((data)=>{
      this.question=data;
      console.log(this.question);
     },(error)=>{
      console.log(error);
      Swal.fire("Error While Fetching Question ! Server Error !");
     })


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

    this._questionService.updateQuestion(this.question).subscribe((data)=>{

      Swal.fire({
        title: 'Question Updated Successfully ',
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
