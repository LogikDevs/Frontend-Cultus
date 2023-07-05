import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetPostsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ` + localStorage.getItem("accessToken")
    })
  }
  constructor(private http: HttpClient) {}
  getPosts(){
    return this.http.get('http://localhost:8000/api/v1/posts', this.httpOptions);
  }
}
