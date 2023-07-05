import { Component } from '@angular/core';
import { CreatePostService } from '../services/create-post.service';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  constructor(private api: CreatePostService) {}
  sendCreatedPost(postData: any){
    return this.api.postCreate(postData).subscribe((res:any)=>{
      console.log(res);
    })
  }
}
