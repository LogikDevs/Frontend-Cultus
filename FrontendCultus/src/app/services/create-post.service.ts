import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {
  body = {
    text: "texto ejemplo",
    location: "locacion ejemplo"
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ` + localStorage.getItem("accessToken")
    })
  }
  constructor(private http: HttpClient) {}
  getPosts(){
    return this.http.post('http://localhost:8000/post/create',this.body, this.httpOptions);
  }
}
