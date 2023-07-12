import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit {
  constructor(private userService: UserService,private _activatedRoute:ActivatedRoute,private _routed:Router) { }

  role:any;
  showPassword=true;

  defineRole:any;

  public User = {
    uniqueName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    profile_image:''
  }

  ngOnInit(): void { 
   
    this.role=this._activatedRoute.snapshot.params['role'];
    console.log(this.role);
  }

  formSubmit() {

    if (this.User.uniqueName == '' || this.User.uniqueName == null) {
      Swal.fire("username required")
      return;
    }

    if(this.role=='' || this.role==null){
      Swal.fire("Please select your role !");
      return;
    }

    if(this.User.password=='' || this.User.password==null){
      Swal.fire("Password Required !");
      return;
    }else{
      if(!this.validatePassword(this.User.password)){
        Swal.fire("Password should contains atleast one Uppercase, one Lowercase, one number and one special Character !")
      return;
      }
      
    }

    this.userService.addUserRoleBased(this.User,this.role).subscribe(
      (data:any) => {
        
        
        Swal.fire(
          'success',
          'Register Successfully',
          'success'
        ).then(()=>{
          this.resetUser();
          this._routed.navigate(['login']);
        })
       
      },
      (error) => {
        console.log(error)
        Swal.fire(error.error.message);
      }
    )

    //create User function call
    // this.userService.addUser(this.User).subscribe(
    //   (data:any) => {
    //     this.resetUser();
        
    //     Swal.fire(
    //       'success',
    //       'Register Successfully',
    //       'success'
    //     )
    //   },
    //   (error) => {
    //     console.log(error.error);
    //     Swal.fire(error.error.message)
    //   }
    // )
  }

  public resetUser(){
    this.User= {
      uniqueName: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      profile_image:''
    }
  }

  updateRole(role: string) {
    this.role = role;
  }

 validatePassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{4,}$/;
    return regex.test(password);
  }

  mobileFieldInvalid(): boolean {
    const mobilePattern = /[0-9]{10}/;
    return !mobilePattern.test(this.User.mobile);
  }
}
