import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class PostRegisterService {

  urlAuthenticationAPI: string = 'http://localhost:8000/api/v1/user';
  private constructor(private http: HttpClient) { }
  PostRegister(credentials: any){
    return this.http.post(this.urlAuthenticationAPI, credentials);
  }
}

