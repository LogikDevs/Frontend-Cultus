import { Component , Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserObj } from '../app.component';
console.log(UserObj);
 @Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
 
export class ProfileComponent {
 
  @Input() UserObj: any = UserObj;
  constructor(private http: HttpClient) {}
}