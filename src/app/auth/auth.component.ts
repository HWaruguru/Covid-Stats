import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../covid-service/auth.service';

@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  isSubmitting: boolean = false;
  authForm: FormGroup;
  authenticated: boolean = false;
  error: string = "";
  returnUrl: string = "";

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private fb: FormBuilder, private authService: AuthService) {
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType === 'login') ? 'Sign In' : 'Sign Up';
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl('', Validators.required));
      }
      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/covid-stats';
    });
  }

  async registerUser(username: string, email: string, password: string) {
    let res: any = await this.authService.registerUser(username, email, password)
    if (res.registered) {
      this.route.navigate(['/login'])
    }
    else {
      this.error = res.error
      this.isSubmitting = false;
      this.route.navigate(['/register'])
    }
  }

  async loginUser(email: string, password: string) {
    let res: any = await this.authService.login(email, password)
    console.log(res)
    if (res.authenticated) {
      this.route.navigate([this.returnUrl])
    }
    else {
      this.error = res
      this.isSubmitting = false;
      this.route.navigate(['/login'])
    }
  }

  async submitForm() {
    this.isSubmitting = true;
    let credentials = this.authForm.value;
    if (this.authType == 'login') {
      this.loginUser(credentials.email, credentials.password)
      } else if(this.authType === 'register') {
        this.registerUser(credentials.username, credentials.email, credentials.password)
      }
    
  }
}