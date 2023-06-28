import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostClass } from 'src/app/posts/PostClass';
import { urlPostsAPI } from 'src/app/app.component';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit(){
    this.http.get(urlPostsAPI).subscribe(res => {
      console.log(res);
    })
  }
}
