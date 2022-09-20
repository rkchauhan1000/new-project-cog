import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router) {
    
    var user = localStorage.getItem('user');

    if(user) router.navigate(['/offersPage']);
  }

  ngOnInit(): void {
  }

  email_auth : String =  "vasvi@cognizant.com";
  password_auth : String =  "temp123";
  

  loginForm = new FormGroup({
    email : new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(15)])
  });

  get Email() : FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get Password() : FormControl {
    return this.loginForm.get('password') as FormControl;
  }
  submitForm()
  {
    // console.log("form submitted successfully")
    // console.log(this.loginForm);

    if(this.loginForm.value.email === this.email_auth && this.loginForm.value.password === this.password_auth)
    {
      console.log("Logged In !!");
      localStorage.setItem("user",this.loginForm.value.email);
      this.router.navigate(['/offersPage']);
    }
    else
    {
      console.log("Not Logged In !!");
    }
  }
}
