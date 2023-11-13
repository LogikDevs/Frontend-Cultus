import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreatePostService } from '../../services/create-post.service';
import { NewPostData } from './create-post.model';
import { GetInterestsService } from 'src/app/services/get-interests.service';
import { GetUserService } from 'src/app/services/get-user.service';
import { Router } from '@angular/router';
import { GetCountriesService } from 'src/app/services/get-countries.service';
@Component({
	selector: 'app-create-post',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
	@Input() isInsideEvents: boolean = false;
	
	postMultimedia: File;
	imageUrl:any;
	defaultUrl:string = "http://localhost:8000/storage/profile_pic/";
	userPfp:string = "assets/post-images/profile_def.jpg";
	userData:any;
	username:string = "";

	publishedPost:any;

	@Output() postHasBeenPublished = new EventEmitter<boolean>();

	@Input() EventPost:any = null;

	@Input() GroupPost:any = null;

	@Output() ComponentRemoved = new EventEmitter<boolean>();

	CompleteMessageShowed:string;
	ErrorMessageShowed:string;

	CompleteMessage = {
		Message: "The Post has been published.",
		visibility: false
	}
	ErrorMessage = {
		Message: "There was an error during the process.",
		LocationMessage: "Location cannot be empty",
		visibility: false
	}

	selectLocation:any = "";

	postInterests:any = this.interestService.NewUserInterestsArray;

	constructor(
		private userService: GetUserService, 
		private createPostService: CreatePostService, 
		public interestService: GetInterestsService,
		private router: Router,
		private countries: GetCountriesService
	) { }
	ngOnInit(){
		this.getUser();
		this.countriesDropbox();
	}
	getUser(){
		this.userService.getUser().subscribe((res:any)=>{
			this.userData = res;
			this.username = this.userData.name + " " +this.userData.surname;
			if (this.userData.profile_pic) this.userPfp = this.defaultUrl + this.userData.profile_pic;
		})
	}
	sendPostData(FormData: any) {
		this.selectLocation = document.getElementById("postLocation");

		const postData: NewPostData = {
			text: FormData.text,
			location: Number(this.selectLocation.value),
			multimedia_file: this.postMultimedia,
			fk_id_event: this.EventPost,
			fk_id_group: this.GroupPost
		}
		console.log(postData);
		this.createPostService.postCreate(postData).subscribe((res:any)=>{
			
			if (res.status === 201){
				this.publishedPost = res.body;

				this.sendPostInterests(this.publishedPost.id_post);
				if (this.postMultimedia) this.sendPostMultimedia(postData.multimedia_file, this.publishedPost.id_post);

				this.OnCompleteAlert();
			}
			if (res.status !== 201) {
				this.OnErrorAlert(res);
			}
		}, (error:any)=>{
			this.OnErrorAlert(error);
		})
	}
	sendPostMultimedia(postMultimedia:File, id_post:any ) {
		this.createPostService.postMultimedia(postMultimedia, id_post).subscribe((res:any)=>{})
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

	countriesDropbox() {
		const selectLocation: any = document.getElementById("postLocation");
		
		this.countries.getCountries().subscribe((res: any) => {
			this.countriesIntoDropbox(selectLocation, res);
		})
	}

	countriesIntoDropbox(select: any, res: any) {
		for (let i = 0; i < res.length; i++) {
			var country = res[i];
			let newOption = new Option(country.country_name, country.id_country);

			select.add(newOption, undefined);
		}
	}

	OnCompleteAlert(){
		this.CompleteMessage.visibility = true;
		this.ErrorMessage.visibility = false;
		setTimeout(() => {
			if (this.EventPost == null) this.router.navigateByUrl("/profile/" + this.userData.id);

			if (this.EventPost) this.postHasBeenPublished.emit(true);
			this.hideComponent(true);
		}, 2000);
	}
	OnErrorAlert(error:any){
		this.ErrorMessageShowed = this.ErrorMessage.Message;
		
		if (error.error.location) this.ErrorMessageShowed= this.ErrorMessage.LocationMessage;

		this.ErrorMessage.visibility = true;
		this.CompleteMessage.visibility = false;
		setTimeout(() => {
			this.hideComponent(false);
		}, 2000);
	}
	hideComponent(Complete:boolean){
		if (Complete == true) this.CompleteMessage.visibility = false;
		if (Complete == false) this.ErrorMessage.visibility = false;
	}
	ComponentRemove(){
		this.ComponentRemoved.emit(true);
	}
}
