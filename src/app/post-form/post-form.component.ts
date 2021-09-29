import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  isSubmitting: boolean = false;
  authForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
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

  submitForm() {
    this.isSubmitting = true;

    let post = this.authForm.value;
    console.log(post);
  }

}
