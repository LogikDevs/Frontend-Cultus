import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  urlgetUser: string = 'http://localhost:8000/api/v1/validate';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem("accessToken")
    })
  };
  private constructor(private http: HttpClient) { }
  getUser(){
    return this.http.get(this.urlgetUser, this.httpOptions);
  }
}
