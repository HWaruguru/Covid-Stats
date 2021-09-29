import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../post';
import { Comment } from '../comment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private baseURL = "http://localhost:5000"

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  registerUser(name: string, email: string, password: string) {
    const url = `${this.baseURL}/user`
    let promise = new Promise((resolve, reject) => {
      this.http
      .post<any>(url, {name, email, password})
      .toPromise()
      .then(
        res => {
          resolve({registered: true});
        },
        error => {
          reject(error)
        })
    })
    return promise
  }

  login(email: string, password: string) {
    const url = `${this.baseURL}/login`
    let promise = new Promise((resolve, reject) => {
      this.http
      .post<any>(url, {email, password})
      .toPromise()
      .then(
        res => {
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.currentUserSubject.next(res);
          resolve({authenticated: true, user: res.user});
        },
        error => {
          resolve(error.error.message)
        })
    })
    return promise
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  fetchPosts(): Promise<Post[]> {
    const url = `${this.baseURL}/user/post`;
    let promise = new Promise<Post[]>((resolve, reject) => {
      this.http
      .get<any>(url)
      .toPromise()
      .then(
        res => {
          let posts: Post[] = res.posts.map((post: any) => {
            return new Post(post.id, post.country, post.tests, post.cases, post.recovered, post.deaths, post.date_created);
          });
          resolve(posts);
        },
        error => {
          resolve(error.error.message)
        })
    })
    return promise
  }

  addPost(country: string, tests: string, cases: string, recovered: string, deaths: string, date_created: Date) {
    console.log(this.currentUserValue)
    const url = `${this.baseURL}/user/${this.currentUserValue.user.public_id}/post`
    let promise = new Promise((resolve, reject) => {
      this.http
      .post<any>(url, {country, tests, cases, recovered, deaths, date_created}, ({headers: new HttpHeaders({ "x-access-token": `${this.currentUserValue.token}`})}))
      .toPromise()
      .then(
        res => {
          resolve({posted: true});
        },
        error => {
          resolve(error.error.message)
        })
    })
    return promise
  }

  addComment(comment: string, date_created: Date, post_id: number) {
    const url = `${this.baseURL}/user/${this.currentUserValue.user.public_id}/post/${post_id}/comment`
    let promise = new Promise((resolve, reject) => {
      this.http
      .post<any>(url, {text: comment, date_created}, ({headers: new HttpHeaders({ "x-access-token": `${this.currentUserValue.token}`})}))
      .toPromise()
      .then(
        res => {
          resolve({posted: true});
        },
        error => {
          resolve(error.error.message)
        })
    })
    return promise
  }

  fetchComments(post_id: number) {
    const url = `${this.baseURL}/post/${post_id}/comments`;
    let promise = new Promise((resolve, reject) => {
      this.http
      .get<any>(url, ({headers: new HttpHeaders({ "x-access-token": `${this.currentUserValue.token}`})}))
      .toPromise()
      .then(
        res => {
          let comments: Comment[] = res.comments.map((comment: any) => {
            return new Comment(comment.id, comment.text, comment.author);
          });
          resolve(comments);
        },
        error => {
          reject(error.error.message)
        })
    })
    return promise
  }

  fetchPost(post_id: number): Promise<Post> {
    const url = `${this.baseURL}/post/${post_id}`;
    let promise = new Promise<Post>((resolve, reject) => {
      this.http
      .get<any>(url, ({headers: new HttpHeaders({ "x-access-token": `${this.currentUserValue.token}`})}))
      .toPromise()
      .then(
        res => {
          let post: Post = new Post(res.post.id, res.post.country, res.post.tests, res.post.cases, res.post.recovered, res.post.deaths, res.post.date_created);
          resolve(post);
        },
        error => {
          reject(error.error.message)
        })
    })
    return promise
  }

  deletePost(post_id: number): Promise<Post> {
    const url = `${this.baseURL}/post/${post_id}`;
    let promise = new Promise<Post>((resolve, reject) => {
      this.http
      .delete<any>(url, ({headers: new HttpHeaders({ "x-access-token": `${this.currentUserValue.token}`})}))
      .toPromise()
      .then(
        res => {
          resolve(res);
        },
        error => {
          reject(error.error.message)
        })
    })
    return promise
  }

  deleteComment(comment_id: number) {
    const url = `${this.baseURL}/comment/${comment_id}`;
    let promise = new Promise((resolve, reject) => {
      this.http
      .delete<any>(url, ({headers: new HttpHeaders({ "x-access-token": `${this.currentUserValue.token}`})}))
      .toPromise()
      .then(
        res => {
          resolve(res);
        },
        error => {
          reject(error.error.message)
        })
    })
    return promise
  }
}