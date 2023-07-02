import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  
  categories:any;

  constructor(private _category:CategoryService,private login:LoginService){}
  
  ngOnInit(): void { 
    this._category.category().subscribe((data)=>{
this.categories=data;
    },(error)=>{
      console.log(error);
      Swal.fire("Error While Fetching Categories ! Server Error !");
    })
  }


  public logout(){
 
    Swal.fire({
      title: 'Sure to Logout !',
      icon: 'info',
      showConfirmButton: true,
      showCancelButton:true,
      timer: 6000 // 2 seconds
    }).then((result) => {

      if(result.isConfirmed){
        let data = this.login.logout();
        if(data){
          Swal.fire({
            title: 'Logout successfully',
            icon: 'success',
            showConfirmButton: true,
            timer: 6000 // 2 seconds
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/login'; // Redirect to the '/login' page
            }else{
              window.location.href = '/login'; // Redirect to the '/login' page
            }
          });
        }else{
          console.log("Logout function not working !!!")
        }
  
      }
      
    
    
      
    });
   

}


}
