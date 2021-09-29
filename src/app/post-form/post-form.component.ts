import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../covid-service/auth.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  isSubmitting: boolean = false;
  authForm: FormGroup;
  error: string = ""

  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) {
    this.authForm = this.fb.group({
      'country': ['', Validators.required],
      'tests': ['', Validators.required],
      'cases': ['', Validators.required],
      'recovered': ['', Validators.required],
      'deaths': ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  async addPost(country: string, tests: string, cases: string, recovered: string, deaths: string, date_created: Date) {
    let res: any = await this.authService.addPost(country, tests, cases, recovered, deaths, date_created)
    if (res.posted) {
      this.route.navigate(['/covid-stats'])
    }
    else {
      this.error = res
      this.isSubmitting = false;
      this.route.navigate(['/add-post'])
    }
  }


  submitForm() {
    this.isSubmitting = true;

    let post = this.authForm.value;
    this.addPost(post.country, post.tests, post.cases, post.recovered, post.deaths, new Date())
  }

}
