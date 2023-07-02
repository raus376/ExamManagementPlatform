import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css']
})
export class UpdateUserProfileComponent implements OnInit{
  
  uId:any=0;
  
  userData:any;
  role:any;

  user:any={
    id:0,
    uniqueName:'',
    password:'',
    email:'',
    firstName:'',
    lastName:'',
    mobile:'',
    profileImage:'',
    isEnable:true
  }

  constructor(private _user:UserService, private login:LoginService, private activatedRoute:ActivatedRoute,private _route:Router){};


  ngOnInit(): void {

    this.uId = this.activatedRoute.snapshot.params['uId']; 
   
    this._user.getUser(this.uId).subscribe((data)=>{
      this.userData=data;
 
      this.user.id=this.userData.id;
      this.user.uniqueName=this.userData.uniqueName,
      this.user.password=this.userData.password,
      this.user.email=this.userData.email,
      this.user.firstName=this.userData.firstName,
      this.user.lastName=this.userData.lastName,
      this.user.mobile=this.userData.mobile,
      this.user.profileImage=this.userData.profileImage,
      this.user.isEnable=true,
      this.role=this.userData.authorities[0].authority;
      // console.log(this.role);
    },(error)=>{
      console.log(error);
      Swal.fire("Error While Fetching Admin Detail ! Server Error !")
    })
   

  }


  formSubmit() {
  
    if (this.user.uniqueName == '' || this.user.uniqueName == null) {
      Swal.fire("username required")
      return;
    }

    if(this.user.password==this.userData.password){
      Swal.fire("Please Enter new Password !");
      return;
    }

    // create User function call
    this._user.updateUser(this.user,this.role).subscribe(
      (data:any) => {
        Swal.fire(
          'success',
          'Updated Successfully',
          'success'
        ).then(()=>{
         Swal.fire("Please Login Again !");
         this.login.logout();
         this._route.navigate(['/login']);
        })
 
      },
      (error) => {
        console.log(error.error);
        Swal.fire(error.error.message)
      }
    )
  }

 resetData(){

 }


}
