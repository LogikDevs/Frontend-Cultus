import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
export var urlAuthenticationAPI: string = 'http://localhost:8000/api/v1/user';
export var urlPostsAPI: string = 'xd';
import { UserClass } from 'src/app/profile/profileClass'; 
var userData: any;
export var UserObj: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  constructor(private http: HttpClient){};
  ngOnInit(){
    this.http.get(urlAuthenticationAPI+'/4').subscribe(res => {
      userData = res;
      UserObj = new UserClass(
        userData.id,
        userData.name,
        userData.surname,
        userData.age,
        userData.gender,
        userData.homeland,
        userData.residence,
        userData.description,
        userData.profile_pic
      )
    })
  }
  
}
