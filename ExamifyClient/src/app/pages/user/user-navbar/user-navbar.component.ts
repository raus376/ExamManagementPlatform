import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent {

  isLoggedIn=false;
  user: any;

  constructor(public login:LoginService,private _navigateRoute:Router){}
  
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
              this._navigateRoute.navigate(['login']);
            }else{
              this._navigateRoute.navigate(['login']);
            }
          });
        }else{
          console.log("Logout function not working !!!")
        }
  
      }
      
    });
   

}


  userProfile(){

    this._navigateRoute.navigate(['user-profile']);
  }

  userHome(){
    this._navigateRoute.navigate(['user-home']);
  }

  

  
}
