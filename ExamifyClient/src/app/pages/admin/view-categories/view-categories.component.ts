import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories: any[] = [];

  constructor(private _category:CategoryService,private _quiz:QuizService,private _route:Router) { }

  ngOnInit(): void { 

    this._category.category().subscribe((data:any)=>{
      this.categories=data;
    },
    (error)=>{
      Swal.fire(error);
    });

  }

  public viewQuiz(cId:any){
 
    this._route.navigate(['admin/view-quiz-by-category',cId]);
  }

 
}
