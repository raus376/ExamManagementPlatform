import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
user:any;
  constructor(private login:LoginService,private _route:Router){}

  ngOnInit():void{
    this.user=this.login.getUser();
  }

  printProfile(){
    window.print();
  }

 updateProfile(uId:any){
  this._route.navigate(['admin/update-profile',uId]);
 }

}
