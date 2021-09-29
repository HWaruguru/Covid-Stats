import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../covid-service/auth.service';
import { Post } from '../post';
import { Comment } from '../comment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  commentForm: FormGroup;
  isSubmitting: boolean = false;
  post: Post;
  post_id: any;
  comments: any;
  error: string = ""

  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router, private activatedRoute: ActivatedRoute) {
    this.commentForm = this.fb.group({
      'comment': ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.post_id = parseInt(this.activatedRoute.snapshot.paramMap.get("id") || "");
    this.fetchComments(this.post_id)
    this.fetchPost(this.post_id)
  }

  async addComment(comment: string) {
    let res: any = await this.authService.addComment(comment, new Date(), this.post_id)
    if (res.posted) {
      this.fetchComments(this.post_id);
      this.commentForm.reset();
    }
    else {
      this.error = res
      this.isSubmitting = false;
      this.route.navigate(['/post'])
    }
  }

  async fetchComments(post_id: number) {
    this.comments = await this.authService.fetchComments(post_id)
  }

  async fetchPost(post_id: number) {
    this.post = await this.authService.fetchPost(post_id)
  }

  async deleteComment(comment_id: number) {
    await this.authService.deleteComment(comment_id)
    this.fetchComments(this.post_id);
  }

  async deletePost(post_id: number) {
    await this.authService.deletePost(post_id)
    this.route.navigate(['/covid-stats'])
  }

  submitForm() {
    this.isSubmitting = true;

    let post = this.commentForm.value;
    this.addComment(post.comment)
  }

}
