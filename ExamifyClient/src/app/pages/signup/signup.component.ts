import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit {
  constructor(private userService: UserService) { }

  public User = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    profile_image:''
  }

  ngOnInit(): void { }

  formSubmit() {

    if (this.User.userName == '' || this.User.userName == null) {
      Swal.fire("username required")
      return;
    }

    //create User function call
    this.userService.addUser(this.User).subscribe(
      (data:any) => {
        console.log(data);
        
        Swal.fire(
          'success',
          'Register Successfully',
          'success'
        )
      },
      (error) => {
        console.log(error);
        Swal.fire("Some thing went wrong")
      }
    )
  }
}