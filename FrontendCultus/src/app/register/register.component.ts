import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    this.http.post('http://localhost:8000/api/v1/user', RegisterAccountData).subscribe((res)=>{
      console.log(res)});
    }
}
