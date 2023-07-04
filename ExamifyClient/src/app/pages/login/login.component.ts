import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    "email": '',
    "password": ''
  }

  constructor(private login: LoginService, private router: Router) { }

  ngOnInit(): void {

  }

  formSubmit() {
    console.log("Login button Click");

    if ((this.loginData.email.trim() == '' || this.loginData.email == null) && (this.loginData.email.trim() == '' || this.loginData.email == null)) {
      Swal.fire("Email and Password Required !!")
    } else if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      Swal.fire("Password Required !!")
    }
    else if (this.loginData.email.trim() == '' || this.loginData.email == null) {
      Swal.fire("Email Required !!")
    } else {
      this.login.generateToken(this.loginData).subscribe(
        (data: any) => {
          Swal.fire({
            title: 'Login successfully',
            icon: 'success',
            showConfirmButton: true,
            timer: 4000 // 4 seconds
          }).then((result) => {
            if (result.isConfirmed) {
              this.login.loginUser(data.token);

              this.login.getCurrentUser().subscribe(
                (user: any) => {
                  this.login.setUser(user);
                  // console.log(this.login.getUserRole());
                  //redirect to specific role authentication
                  if (this.login.getUserRole() == 'ROLE_ADMIN' || this.login.getUserRole()=='ROLE_ORGANIZATION') {
                    // redirect to Admin page
                    // this.router.navigate(['admin']);
                    //redirect to home page
                    this.router.navigate(['']);
                    this.login.loginStatusSubject.next(true);
                  } else if (this.login.getUserRole() == 'ROLE_NORMAL') {
                    // redirect to User page
                    // this.router.navigate(['user-dashboard/0']);
                    //navigate to user-home page
                    this.router.navigate(['/user-home']);
                    this.login.loginStatusSubject.next(true);
                  } else {
                    //logout
                    this.login.logout();
                  }
                },
                (error) => {
                  console.log(JSON.stringify(error))
                }
              )
            } else {
              this.login.loginUser(data.token);

              this.login.getCurrentUser().subscribe(
                (user: any) => {
                  this.login.setUser(user);
                  //redirect to specific role authentication
                  if (this.login.getUserRole() == 'ROLE_ADMIN' || this.login.getUserRole()=='ROLE_ORGANIZATION') {
                    // redirect to Admin page
                    // this.router.navigate(['admin']);
                    //redirect to home page
                    this.router.navigate(['']);
                    this.login.loginStatusSubject.next(true);
                  } else if (this.login.getUserRole() == 'ROLE_NORMAL') {
                    // redirect to User page
                    // this.router.navigate(['user-dashboard/0']);
                    //navigate to user-home page
                    this.router.navigate(['/user-home']);
                    this.login.loginStatusSubject.next(true);
                  } else {
                    //logout
                    this.login.logout();
                  }
                },
                (error) => {
                  console.log(JSON.stringify(error))
                }
              )
            }
          });
        },
        (error) => {
          Swal.fire(error.error.text)
        }
      )
    }
  }

  resetData(){
    this.loginData={
      "email": '',
      "password": ''
    }
  }

}
