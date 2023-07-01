import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  
  isLoggedIn=false;
  user: any;

  constructor(public login:LoginService){}
  
  ngOnInit(): void {
    this.isLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn=this.login.isLoggedIn();
      this.user=this.login.getUser();
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
