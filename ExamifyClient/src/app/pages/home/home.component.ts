import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
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
    this._route.navigate(['admin']);
  }
}
