import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetUserService } from './get-user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  constructor(private http: HttpClient, private api: GetUserService, private router: Router) { }
  urlApiEditUser:string = "http://localhost:8000/api/v1/user/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ` + localStorage.getItem("accessToken")
    })
  }
  getEditUser(EditUserData:any){
    this.api.getUser().subscribe((res:any)=>{
      const body = {
        id: res.id,
        name: res.name,
        surname: res.surname,
        age: res.age,
        email: res.email,
        password: res.password,
        homeland: EditUserData.homeland,
        residence: EditUserData.residenceCountry,
        gender: EditUserData.gender,
        profile_pic: EditUserData.profile_pic,
        description: EditUserData.description
      }
      this.sendEditUser(body);
    });
  }  
  sendEditUser(body:any){
    this.http.put(this.urlApiEditUser+body.id, body, this.httpOptions);
    this.router.navigateByUrl('/SelectInterest');
  }
}
