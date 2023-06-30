import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  urlAuthenticationAPI: string = 'http://localhost:8000/api/v1/user';
  private constructor(private http: HttpClient) { }
  getUser(){
    return this.http.get(this.urlAuthenticationAPI+'/26');
  }
}
