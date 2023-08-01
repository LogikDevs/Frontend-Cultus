import { Component } from '@angular/core';
import { CreatePostService } from '../../services/create-post.service';

@Component({
	selector: 'app-create-post',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

	userId = localStorage.getItem("IdUser");
	postMultimedia: File;

	constructor(private createPostService: CreatePostService) { }
	
	onFileChange(event: any) {
		this.postMultimedia = event.target.files[0];
	}

	sendPostData(FormData: any) {
		const postData = {
			text: FormData.text,
			latitud: FormData.latitud,
			longitud: FormData.longitud,
			multimedia_file: this.postMultimedia
		}
		this.createPostService.postCreate(postData, this.userId).subscribe((res:any)=>{
			console.log(res);
			const newPostId = res.id_post;
			if (this.postMultimedia){
				this.sendPostMultimedia(postData.multimedia_file, newPostId)
			}
		})
	}
	sendPostMultimedia(postMultimedia:any, id_post:any ) {
		this.createPostService.postMultimedia(postMultimedia, id_post).subscribe((res:any)=>{
			console.log("sendPostMultimedia: ", res);
		})
	}
}
