import { Component, Input } from '@angular/core';
import { CreatePostService } from '../../services/create-post.service';
import { NewPostData } from './create-post.model';
import { GetInterestsService } from 'src/app/services/get-interests.service';
import { GetUserService } from 'src/app/services/get-user.service';
@Component({
	selector: 'app-create-post',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
	
	postMultimedia: File;
	userData:any;
	constructor(
		private userService: GetUserService, 
		private createPostService: CreatePostService, 
		public interestService: GetInterestsService
	) { }
	ngOnInit(){
		this.userService.getUser().subscribe((res:any)=>{
			this.userData = res;
		})
	}
	sendPostData(FormData: any) {
		const postData: NewPostData = {
			text: FormData.text,
			latitud: FormData.latitud,
			longitud: FormData.longitud,
			multimedia_file: this.postMultimedia
		}
		this.createPostService.postCreate(postData).subscribe((res:any)=>{
			if (res.status === 201){
				const newPostId = res.id_post;
				this.sendPostInterests(newPostId);
				if (this.postMultimedia) this.sendPostMultimedia(postData.multimedia_file, newPostId);
			}
		}, (error:any)=>{
			console.log("Mostrar mensaje de Error al crear Post");
		})
	}
	sendPostMultimedia(postMultimedia:File, id_post:any ) {
		this.createPostService.postMultimedia(postMultimedia, id_post).subscribe((res:any)=>{})
	}
	onFileChange(event: any) {
		this.postMultimedia = event.target.files[0];
	}

	showPostInterestSelection(){
		this.interestService.displaySelectInterest = true;
	}

	sendPostInterests(postId:any){
		const InterestsArray:any = this.interestService.NewUserInterestsArray;
		for (let i = 0; i < InterestsArray.length; i++){
			this.interestService.sendPostInterests(postId, InterestsArray[i]).subscribe((res:any)=>{})
		}
		this.interestService.NewUserInterestsArray = [];
	}
}
