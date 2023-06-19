import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
constructor() {}

public User={
  userName:'',
  password:'',
  firstName:'',
  lastName:'',
  email:'',
  mobile:'',
}

ngOnInit():void {}

formSubmit(){
  alert("submit")
  console.log(this.User)
}
}
