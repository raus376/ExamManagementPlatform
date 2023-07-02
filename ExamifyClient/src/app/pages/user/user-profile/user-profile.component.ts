import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user: any;
  uId:any;

  constructor(private login: LoginService,private _route:Router) { }

  ngOnInit(): void {
    this.user = this.login.getUser();
  }

  printProfile(){
    window.print();
  }

 updateProfile(uId:any){
  this._route.navigate(['user-dashboard/update-user-profile',uId]);
 }
}
