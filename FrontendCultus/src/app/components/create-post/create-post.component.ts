import { Component } from '@angular/core';
import { CreatePostService } from '../../services/create-post.service';
import { NewPostData } from './create-post.model';
@Component({
	selector: 'app-create-post',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
	userId = localStorage.getItem("IdUser");
	postMultimedia: File;
	constructor(private createPostService: CreatePostService) { }

	sendCreatedPost(FormData:any){
		this.sendPostData(FormData);
	}
	sendPostData(FormData: any) {
		const postData: NewPostData = {
			text: FormData.text,
			latitud: FormData.latitud,
			longitud: FormData.longitud,
			multimedia_file: this.postMultimedia
		};
		this.createPostService.postCreate(postData, this.userId).subscribe((res:any)=>{
			console.log(res);
			const newPostId = res.id_post;
			if (this.postMultimedia){
				this.sendPostMultimedia(postData.multimedia_file, newPostId)
			}
		});
	}
	sendPostMultimedia(postMultimedia:any, id_post:any ) {
		console.log("postMultimedia: ",postMultimedia);
		this.createPostService.postMultimedia(postMultimedia, id_post).subscribe((res:any)=>{
			console.log("sendPostMultimedia: ", res);
		});
	}
	onFileChange(event: any) {
		this.postMultimedia = event.target.files[0];
	}
}
