import { Component } from '@angular/core';
import { CreatePostService } from '../services/create-post.service';
import { GetUserService } from '../services/get-user.service';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  constructor(private api: CreatePostService, private api2: GetUserService) {
  }
  
  userId:any;
  getUser(){
    return this.api2.getUser().subscribe((res:any)=>{
      this.userId = res.id;
    })
  }
  sendCreatedPost(postData: any){
    return this.api.postCreate(postData, this.userId).subscribe((res:any)=>{
      console.log("Post Data: " + postData);
      console.log("User Id: " + this.userId);
      console.log(res);
    })
  }
  ngOnInit(){
    this.getUser();
  }
}
