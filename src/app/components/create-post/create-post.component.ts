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
	imageUrl:any;
	defaultUrl:string = "http://localhost:8000/storage/profile_pic/";
	userPfp:string = "assets/post-images/profile_def.jpg";
	userData:any;
	username:string = "";

	@Input() EventPost:any = null;

	CompleteMessage = {
		Message: "the Post has been published.",
		visibility: false
	}
	ErrorMessage = {
		Message: "There was an error during the process.",
		visibility: false
	}

	postInterests:any = this.interestService.NewUserInterestsArray;

	constructor(
		private userService: GetUserService, 
		private createPostService: CreatePostService, 
		public interestService: GetInterestsService
	) { }
	ngOnInit(){
		this.getUser();
	}
	getUser(){
		this.userService.getUser().subscribe((res:any)=>{
			this.userData = res;
			this.username = this.userData.name + " " +this.userData.surname;
			if (this.userData.profile_pic) this.userPfp = this.defaultUrl + this.userData.profile_pic;
		})
	}
	sendPostData(FormData: any) {
		const postData: NewPostData = {
			text: FormData.text,
			latitud: FormData.latitud,
			longitud: FormData.longitud,
			multimedia_file: this.postMultimedia,
			fk_id_event: this.EventPost
		}
		this.createPostService.postCreate(postData).subscribe((res:any)=>{
			if (res.status === 201){
				const newPostId = res.body.id_post;

				this.sendPostInterests(newPostId);
				if (this.postMultimedia) this.sendPostMultimedia(postData.multimedia_file, newPostId);

				this.OnCompleteAlert();
			}
			if (res.status !== 201) {
				this.OnErrorAlert();
			}
		}, (error:any)=>{
			this.OnErrorAlert();
		})
	}
	sendPostMultimedia(postMultimedia:File, id_post:any ) {
		this.createPostService.postMultimedia(postMultimedia, id_post).subscribe((res:any)=>{
			console.log(res)
		})
	}
	onFileChange(event: any) {
		this.postMultimedia = event.target.files[0];
		if (this.postMultimedia) {
			const reader = new FileReader();
			reader.onload = (event) => {
				this.imageUrl = event.target?.result;
			}
			reader.readAsDataURL(this.postMultimedia);
		  }
	}

	showPostInterestSelection(){
		this.interestService.displaySelectInterest = true;
	}

	sendPostInterests(postId:any){
		const InterestsArray:any = this.interestService.NewUserInterestsArray;
		for (let i = 0; i < InterestsArray.length; i++){
			this.interestService.sendPostInterests(postId, InterestsArray[i].id_label).subscribe((res:any)=>{})
		}
		this.interestService.NewUserInterestsArray = [];
	}

	OnCompleteAlert(){
		this.CompleteMessage.visibility = true;
		this.ErrorMessage.visibility = false;
		setTimeout(() => {
			this.hideComponent(true);
		}, 4000);
	}
	OnErrorAlert(){
		this.ErrorMessage.visibility = true;
		this.CompleteMessage.visibility = false;
		setTimeout(() => {
			this.hideComponent(false);
		}, 4000);
	}
	hideComponent(Complete:boolean){
		if (Complete == true) this.CompleteMessage.visibility = false;
		if (Complete == false) this.ErrorMessage.visibility = false;
	}
}
