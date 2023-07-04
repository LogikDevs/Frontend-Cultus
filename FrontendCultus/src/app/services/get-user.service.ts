import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
var userData:any;
@Injectable({
  providedIn: 'root'
})

export class GetUserService {
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
    return this.http.get(this.urlgetUser, this.httpOptions)
  }
  getUserInterests(){
    console.log(userData.id);
    return this.http.get(this.urlUserInterests + userData.id);
    
  }
}