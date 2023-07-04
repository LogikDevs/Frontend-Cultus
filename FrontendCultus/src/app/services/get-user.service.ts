import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
var userData:any;
@Injectable({
  providedIn: 'root'
})

export class GetUserService {
  User: any[] = [];
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
        userData = res;
        this.User.push({
          id: userData.id,
          name: userData.name,
          surname: userData.surname,
          age: userData.age,
          gender: userData.gender,
          homeland: userData.homeland,
          residence: userData.residence,
          description: userData.description,
          profile_pic: userData.profile_pic
      });
    });
  }
  getUserInterests(){
    return this.http.get(this.urlUserInterests + userData.id);
  }
}