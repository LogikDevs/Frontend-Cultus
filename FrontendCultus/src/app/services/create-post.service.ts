import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {
  
  constructor(private http: HttpClient) {}
  postCreate(postDataReceived:any, UserIdReceived:any){
  const urlCreatePost= 'http://localhost:8001/api/post/create';
  const body = {
    text: postDataReceived.text,
    location: postDataReceived.location,
    id: UserIdReceived
  }
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ` + localStorage.getItem("accessToken")
    })
  }
    return this.http.post(urlCreatePost, body, httpOptions);
  }
}
