import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GetUserService } from '../../services/get-user.service';
import { User } from './profile.model';
import { Post } from '../PostsFolder/posts/post.model';
import { GetPostsService } from 'src/app/services/get-posts.service';
import { ActivatedRoute } from '@angular/router';
import { FollowsService } from 'src/app/services/follows.service';
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
	
	userFollows:any;
	@Input() isFollowing:string;
	posts: Post[];
	
	selectedImage: string | undefined;
	
	constructor(private route: ActivatedRoute, private userService: GetUserService, private postsService: GetPostsService, private followService: FollowsService) { }

	ngOnInit() {
		this.checkProfileType();
		this.getProfile();
		this.CheckFollowOrUnfollow(false);
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
		if (this.userData.homeland == undefined) this.userData.homeland = 'No especificado.';
		if (this.userData.residence == undefined) this.userData.residence = 'No especificado.';
	}

	getUserPosts(){
		this.postsService.getUserPosts(this.ProfileId).subscribe((res:any)=>{
			this.posts = res;
		})
	}
	
	CheckFollowOrUnfollow(click:boolean){
		this.followService.getUserFollowedAccounts(this.userId).subscribe((res:any)=>{
			this.userFollows = Object.values(res);
			const userFollowsAccount = this.userFollows.find((follow:any) => Number(follow.id_followed) === Number(this.ProfileId));
			if (userFollowsAccount) {
				this.isFollowing = "Unfollow";
				if (click === true) this.UnfollowAction();
			}
			if (!userFollowsAccount) {
				this.isFollowing = "Follow";
				if (click === true) this.FollowAction();
			}			
		})
	}
	FollowAction(){
		this.followService.sendFollow(this.userId, this.ProfileId).subscribe((res:any)=>{
			if (res.id_followed[0] === "This user already follows the other.") this.UnfollowAction();
			else this.isFollowing = "Unfollow";
		})
	}
	UnfollowAction(){
		this.followService.Unfollow(this.userId, this.ProfileId).subscribe((res:any)=>{
			this.isFollowing = "Follow";
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