import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit {
  constructor(private userService: UserService,private _activatedRoute:ActivatedRoute) { }

  role:any;

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

    this.userService.addUserRoleBased(this.User,this.role).subscribe(
      (data:any) => {
        
        
        Swal.fire(
          'success',
          'Register Successfully',
          'success'
        ).then(()=>{
          this.resetUser();
          window.location.href = '/login'
        })
       
      },
      (error) => {
        console.log(error.error);
        Swal.fire(error.error.message)
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
}
