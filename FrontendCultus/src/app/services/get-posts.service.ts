import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetPostsService {

  constructor(private http: HttpClient) {}
  getPosts(){
    return this.http.get('http://localhost:8000/api/v1/posts');
  }
}
