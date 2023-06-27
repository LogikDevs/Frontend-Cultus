import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostClass } from 'src/app/posts/PostClass';
import { urlPostsAPI } from 'src/app/app.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  getPostData: any;
  error: any;
  constructor(private http: HttpClient) { }

  ngOnInit(){
    this.http.get<any>(urlPostsAPI).subscribe(data => {
      this.getPostData = data.total;
    },error => this.error = error);
  }
}
