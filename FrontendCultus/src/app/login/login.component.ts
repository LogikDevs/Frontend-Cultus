import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {urlAuthenticationAPI} from 'src/app/app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private http: HttpClient){
  };
  getLoginFormData(LoginAccountData:any){
    console.log(LoginAccountData);
    this.http.post(urlAuthenticationAPI, LoginAccountData).subscribe((res)=>{
      console.log(res)});
    }
  }

