import { Component, OnInit } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  title = 'Countries';
  posts: Post[] = [
    new Post(1, 'Kenya', 120, 30, 40, 50, new Date(2021, 7, 20)),
    new Post(2, 'Uganda', 130, 60, 7, 8, new Date(2021, 7, 20)),
    new Post(3,  'South Africa', 5, 43, 52, 17, new Date(2021, 7, 20)),
    new Post(4,  'Haiti', 10, 34, 56, 79, new Date(2021, 7, 20)),
    new Post(5,  'India', 102, 76, 41, 21, new Date(2021, 7, 20)),
    new Post(6, 'Norway', 170, 35, 75, 80, new Date(2021, 7, 20))
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
