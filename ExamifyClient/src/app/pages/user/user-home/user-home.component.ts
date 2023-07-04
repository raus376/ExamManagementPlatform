import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit{
 
  user:any;



  constructor(private _login:LoginService,private _activatedRoute:ActivatedRoute,private _route:Router){};
  
  ngOnInit(): void {
   this.user=this._login.getUser();
  
  }

  roleDefine(role:any){
    // console.log(role);
    this._route.navigate(['signup/', role])
  }

  navigateToAdminPage(){
    this._route.navigate(['/participant']);
  }

}
