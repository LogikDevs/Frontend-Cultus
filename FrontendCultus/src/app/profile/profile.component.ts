import { Component , ElementRef, OnInit, ViewChild } from '@angular/core';
import { GetUserService } from '../services/get-user.service';
var userData: any;
var userInterests: any;
 @Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedImage: string | undefined;
  User: any[] = [];
  constructor(private api: GetUserService) { }

  ngOnInit():void {
    this.getUser();
  }
  getUser(){
    this.api.getUser().subscribe((res:any) => {
      this.User.push({
        id: res.id,
        email: res.email,
        name: res.name,
        surname: res.surname,
        age: res.age,
        gender: res.gender,
        homeland: res.homeland,
        residence: res.residence,
        description: res.description,
        profile_pic: res.profile_pic
    }); 
    this.api.getUserInterests(res.id).subscribe((res2:any) => {
      userInterests = res2;
      })
    })
  }
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}