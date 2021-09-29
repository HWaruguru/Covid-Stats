import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../covid-service/auth.service';
import { Post } from '../post';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  title = 'Countries';
  posts: Post[];
  currentUser: any;

  constructor(private postService: AuthService, private router: Router) { 
    this.postService.currentUser.subscribe(x => this.currentUser = x);
  }

  async getPosts() {
    this.posts = await this.postService.fetchPosts();
  }

  ngOnInit(): void {
    this.getPosts()
  }

}
