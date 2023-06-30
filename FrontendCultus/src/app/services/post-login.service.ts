import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostLoginService {
  urlAuthenticationAPI: string = 'http://localhost:8000/api/v1/user';
  private constructor(private http: HttpClient) { }
  PostLogin(inputdata: any){
    return this.http.post(this.urlAuthenticationAPI, inputdata);
  }
}
