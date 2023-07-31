import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GetUserService } from '../../services/get-user.service';
import { User, UserCountries } from './profile.model';
import { Post } from '../PostsFolder/posts/post.model';
import { GetPostsService } from 'src/app/services/get-posts.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
	@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
	
	@Input() userData:User;
	@Input() userCountries:UserCountries = {
		homelandName: "", 
		residenceName: ""
	}
	@Input() userInterests: any;
	posts: Post[];
	selectedImage: string | undefined;
	userId = localStorage.getItem("IdUser");
	constructor(private api: GetUserService, private postsService: GetPostsService) { }
	ngOnInit(): void {
		this.getUser();
		this.getUserInterests();
		this.getUserPosts();
	}
	getUser() {
		this.api.getUserFromId(this.userId).subscribe((res:any) => {
			this.userData = res;
			this.getUserHomeland(this.userData.homeland);
			this.getUserResidence(this.userData.residence);
		})
	}
	getUserHomeland(idCountry:any){
		this.api.getUserCountry(idCountry).subscribe((res:any)=>{	
			this.userCountries.homelandName = res.country_name;
		})
	}
	getUserResidence(idCountry:any){
		this.api.getUserCountry(idCountry).subscribe((res:any)=>{			
			this.userCountries.residenceName = res.country_name;
		})
	}
	getUserPosts(){
		this.postsService.getUserPosts(this.userId).subscribe((res:any)=>{
			this.posts = res;
		})
	}
	getUserInterests(){
		this.api.getUserInterests(this.userId).subscribe((res: any) => {
			this.userInterests = res;
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