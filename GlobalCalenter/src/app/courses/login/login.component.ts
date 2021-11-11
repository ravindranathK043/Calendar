import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Userdetail } from '../userdetail';
import { UserdetailService } from '../userdetail.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any; msg!: string;
  form: FormGroup = new FormGroup({});
  user: Userdetail[] = [];  
  storage: any; userGet: any;
 
  constructor(public loginUser: UserdetailService,
    private router: Router,
    private fromBuilder: FormBuilder,
    private _route: ActivatedRoute) {
    this.loginForm = this.fromBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
      });
  }

  ngOnInit(): void {   
  }
  onSubmit(fromData: { value: any; }) {
    
    this.loginUser.login(fromData.value).subscribe(res => {
      this.router.navigateByUrl('/courses/list');
    });
  }

  registerUser(userName: any, Password: any) {
    if ((userName.value == "admin" && Password.value == "admin")
      || (userName.value == "ravi" && Password.value == "ravi")
      || (userName.value == "Raj" && Password.value == "Raj")
      || (userName.value == "sekar" && Password.value == "sekar")
      || (userName.value == "gopi" && Password.value == "gopi"))
    {
      localStorage.setItem("Users", JSON.stringify(userName.value));
      localStorage.removeItem("startDate"); localStorage.removeItem("endDate");
      this.router.navigateByUrl('/courses/list');
    } else {
      alert("Invalid User");
    }
  }
}
