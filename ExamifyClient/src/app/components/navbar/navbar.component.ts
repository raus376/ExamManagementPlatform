import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public login:LoginService,private _route:Router){}
  
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
              this._route.navigate(['login']);
            }else{
              this._route.navigate(['login']);
            }
          });
        }else{
          console.log("Logout function not working !!!")
        }
  
      }
      
    });
   

  }

}
