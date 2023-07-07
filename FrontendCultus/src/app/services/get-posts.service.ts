import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetPostsService {
  private urlGetPosts = 'http://localhost:8001/api/post/listAll';
  constructor(private http: HttpClient) {}
  getPosts(){  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ` + localStorage.getItem("accessToken")
      })
    }
    return this.http.get(this.urlGetPosts, httpOptions);
  }
}
