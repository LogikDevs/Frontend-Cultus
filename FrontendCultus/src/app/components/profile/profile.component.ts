import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GetUserService } from '../../services/get-user.service';
import { User } from './profile.model';
import { Post } from '../PostsFolder/posts/post.model';
import { GetPostsService } from 'src/app/services/get-posts.service';
import { GetInterestsService } from 'src/app/services/get-interests.service';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
	@Input() ProfileId:any = this.route.snapshot.params['id'];;
	userId = localStorage.getItem("IdUser");
	ownProfile:boolean = false;

	@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

	@Input() userData:User;

	userInterests: any[] = [];
	
	posts: Post[];
	
	selectedImage: string | undefined;
	
	constructor(private route: ActivatedRoute, private userService: GetUserService, private postsService: GetPostsService) { }

	ngOnInit() {
		this.checkProfileType();
		this.getProfile();
	}
	checkProfileType(){
		if (this.ProfileId === this.userId) this.ownProfile = true;
	}
	getProfile(){
		this.userService.getProfile(this.ProfileId).subscribe((res:any)=>{
			this.userData = res;
			this.userInterests = Object.values(res.interests).map((item:any) => item.interest);
			this.checkCountries();
		});
	}
	checkCountries(){
		if (this.userData.homeland == undefined) this.userData.homeland = 'Not Specified.';
		if (this.userData.residence == undefined) this.userData.residence = 'Not Specified.';
	}

	getUserPosts(){
		this.postsService.getUserPosts(this.ProfileId).subscribe((res:any)=>{
			this.posts = res;
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