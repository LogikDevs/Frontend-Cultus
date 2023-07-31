import { Component } from '@angular/core';
import { CreatePostService } from '../../services/create-post.service';

@Component({
	selector: 'app-create-post',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
	userId = localStorage.getItem("IdUser");
	
	constructor(private createPostService: CreatePostService) { }

	sendCreatedPost(postData: any) {
		return this.createPostService.postCreate(postData, this.userId).subscribe((res:any)=>{
			console.log(res);
		});
	}
	sendPostMultimedia(postMultimedia:any) {

	}
}
