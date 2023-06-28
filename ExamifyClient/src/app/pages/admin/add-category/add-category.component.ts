import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = {
    title: '',
    description: '',
  }

  constructor(private _category:CategoryService){}

  ngOnInit(): void { };

  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      Swal.fire({
        title: 'Title Required',
        icon: 'error',
        showConfirmButton: true,
        timer: 2500 // 4 seconds
      })
      return;
      }

      if (this.category.description.trim() == '' || this.category.description == null) {
        Swal.fire({
          title: 'Description Required',
          icon: 'error',
          showConfirmButton: true,
          timer: 2500 // 4 seconds
        })
        return;
        }
      
     this._category.addCategory(this.category).subscribe((data:any)=>{
      this.category.title='',
      this.category.description='',
      Swal.fire({
        title: 'Category Added Successfully ',
        icon: 'success',
        showConfirmButton: true,
        timer: 2500 // 4 seconds
      })
     },
     (error)=>{
      console.log(error);
      Swal.fire("Server Error !")
     })
    }




  }
