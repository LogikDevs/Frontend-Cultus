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
    this.http.post('/api/v1/user', RegisterAccountData);
}
}
