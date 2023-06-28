import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  
  categories:any;

  constructor(private _category:CategoryService){}
  
  ngOnInit(): void { 
    this._category.category().subscribe((data)=>{
this.categories=data;
    },(error)=>{
      console.log(error);
      Swal.fire("Error While Fetching Categories ! Server Error !");
    })
  }

}
