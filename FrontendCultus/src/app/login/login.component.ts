import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    this.http.post('http://localhost:8000/api/v1/user', LoginAccountData).subscribe((res)=>{
      console.log(res)});
    }
  }

