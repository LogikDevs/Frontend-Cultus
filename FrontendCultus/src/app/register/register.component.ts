import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {urlAuthenticationAPI} from 'src/app/app.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private http: HttpClient){
  };
getRegisterFormData(RegisterAccountData:any){
    console.log(RegisterAccountData);
    this.http.post(urlAuthenticationAPI, RegisterAccountData).subscribe((res)=>{
      console.log(res)});
    }
}
