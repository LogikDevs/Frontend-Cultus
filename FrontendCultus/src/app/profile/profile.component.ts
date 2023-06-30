import { Component , OnInit } from '@angular/core';
import { GetUserService } from '../services/get-user.service';
var userData: any;
 @Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit{
  constructor(private api: GetUserService) { }
  User: any[] = [];
  ngOnInit():void {
    this.getUser();
  }
  getUser(){
    this.api.getUser().subscribe(res => {
      userData = res;
      this.User.push({
        id: userData.id,
        name: userData.name,
        surname: userData.surname,
        age: userData.age,
        gender: userData.gender,
        homeland: userData.homeland,
        residence: userData.residence,
        description: userData.description,
        profile_pic: userData.profile_pic
      });
      console.log(this.User);
    })
  }
}