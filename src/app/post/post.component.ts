import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  commentForm: FormGroup;
  isSubmitting: boolean = false;
  post: Post = new Post(1, 'Kenya', 120, 30, 40, 50, new Date(2021, 7, 20));
  comment: any = {comment: "Here here, you are a great human"};
  user: any = { username: "hapaHey" }

  constructor(private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      'comment': ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.isSubmitting = true;

    let post = this.commentForm.value;
    console.log(post);
  }

}
