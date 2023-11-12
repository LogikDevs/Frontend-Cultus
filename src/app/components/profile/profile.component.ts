import { Component, ElementRef, Input, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { GetUserService } from '../../services/get-user.service';
import { User } from './profile.model';
import { Post } from '../PostsFolder/singlepost/post.model';
import { GetPostsService } from 'src/app/services/get-posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowsService } from 'src/app/services/follows.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	@Input() ProfileId:any = Number(this.route.snapshot.params['id']);
	@Input() pfpUrl:string;
	@Input() userId:any;
	@Input() ProfileData:User;
	@Input() isFollowing:string;

	ownProfile:boolean = false;
	
	Url_profile_pic:string="http://localhost:8000/storage/profile_pic/";
	
	userInterests: any[] = [];
	
	userFollows:any;

	
	posts: Post[];
	
	

	msgNoData:string = "Not Specified.";

	textHomelandOrResidence:any = {
		homeland: "From ",
		residence: "Lives in "
	}
	@Input() userDataVariable:any = {
		homeland: this.msgNoData,
		residence: this.msgNoData,
		userGender: this.msgNoData,
		description: ""
	}

	selectedImage: string | undefined;
  	isDragging: boolean = false;

	@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  	@ViewChild('ContainerInterest', { static: true }) ContainerInterest!: ElementRef<HTMLDivElement>;
  
	CompleteMessage = {
		Message: "the Post has been removed.",
		visibility: false
	}

	constructor(
    	private route: ActivatedRoute, 
    	private userService: GetUserService, 
    	private postsService: GetPostsService, 
    	private followService: FollowsService, 
    	private router: Router,
    	private renderer: Renderer2 
  	) { }


	ngOnInit() {
		this.checkProfileType();
		this.getProfile();
		this.CheckFollowOrUnfollow(false);
		this.getUserPosts();
	}
	
	checkProfileType(){
		this.userService.getUser().subscribe((res:any)=>{
			this.userId = res.id;
			if (this.ProfileId === this.userId) this.ownProfile = true;
		})
	}	
	
	getProfile(){
		this.userService.getProfile(this.ProfileId).subscribe((res:any)=>{

			this.ProfileData = res;
			this.userInterests = Object.values(res.interests).map((item:any) => item.interest);
			this.checkProfilePic();
			this.checkUserData();
		});
	}	

	checkProfilePic(){
		if (this.ProfileData.profile_pic != null) this.pfpUrl = this.Url_profile_pic + this.ProfileData.profile_pic;
		
		if (this.ProfileData.profile_pic === null) this.pfpUrl= "assets/post-images/profile_def.jpg"
	}

	checkUserData(){
		if (this.ProfileData.homeland) this.userDataVariable.homeland = this.textHomelandOrResidence.homeland+this.ProfileData.homeland.country_name;
		
		if (this.ProfileData.residence) this.userDataVariable.residence = this.textHomelandOrResidence.residence+this.ProfileData.residence.country_name;
	
		if (this.ProfileData.description) this.userDataVariable.description = this.ProfileData.description;
		
		if (this.ProfileData.gender) this.userDataVariable.gender = this.ProfileData.gender;
	}

	getUserPosts(){
		this.postsService.getUserPosts(this.ProfileId).subscribe((res:any)=>{
			this.posts = res;
		})
	}
	
	CheckFollowOrUnfollow(click:boolean){
		this.followService.getUserFollowedAccounts().subscribe((res:any)=>{
			this.userFollows = Object.values(res);
			const userFollowsAccount = this.userFollows.find((follow:any) => Number(follow.id_followed) === this.ProfileId);
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
		this.followService.sendFollow(this.ProfileId).subscribe((res:any)=>{
			this.isFollowing = "Unfollow";
		})
	}
	UnfollowAction(){
		this.followService.Unfollow(this.ProfileId).subscribe((res:any)=>{
			this.isFollowing = "Follow";
		})
	}

	ToEditProfile(){
		this.router.navigateByUrl('/EditProfile');
	}
	SendMessage(){
		this.router.navigateByUrl('/Messages/' + this.ProfileId);
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

  	onDragStart(event: DragEvent) {
    	event.dataTransfer?.setData('text/plain', ''); 
    	this.renderer.setStyle(event.currentTarget, 'opacity', '1');
    	this.isDragging = true;
  	}

  	onDragEnd(event: DragEvent) {
    	this.renderer.setStyle(event.currentTarget, 'opacity', '1');
    	this.isDragging = false;
  	}

  	onDragOver(event: DragEvent) {
    	event.preventDefault();
    	if (this.isDragging) {
    	  	const container = event.currentTarget as HTMLElement;
    	  	const offsetX = event.clientX - container.getBoundingClientRect().left;
    	  	const containerWidth = container.clientWidth;
    	  	const scrollLeft = (offsetX / containerWidth) * (container.scrollWidth - containerWidth);
    	  	container.scrollLeft = scrollLeft;
    	}
  	}

	OnCompleteAlert(){
		this.CompleteMessage.visibility = true;
		setTimeout(() => {
			this.hideComponent(true);
		}, 4000);
	}
	hideComponent(Complete:boolean){
		if (Complete == true) this.CompleteMessage.visibility = false;
	}
}
