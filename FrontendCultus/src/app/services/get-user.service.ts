import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class GetUserService {
  user:any;
  userId:any;
  urlgetUser: string = 'http://localhost:8000/api/v1/validate';
  urlUserInterests: string = "http://localhost:8000/api/v1/likes/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ` + localStorage.getItem("accessToken")
    })
  };
  private constructor(private http: HttpClient) { }
  getUser(){
    return this.http.get(this.urlgetUser, this.httpOptions).subscribe(res => {
        res = this.user;
        this.userId = this.user.id;
    });
  }
  getUserInterests(){
    return this.http.get(this.urlUserInterests + this.userId);
  }
}