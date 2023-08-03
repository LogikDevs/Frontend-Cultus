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
	@Input() userInterests: any;
	@Input() userData:User;
	@Input() userCountries:UserCountries = {
		homelandName: "", 
		residenceName: ""
	}
	userId = localStorage.getItem("IdUser");
	
	posts: Post[];
	
	selectedImage: string | undefined;
	
	constructor(private userService: GetUserService, private postsService: GetPostsService) { }

	ngOnInit() {
		this.userData = this.userService.getUserData();
		this.getCountries();
		this.getUserInterests();
		this.getUserPosts();
	}

	getCountries(){
		this.getUserCountryInfo(this.userData.homeland, "homeland");
		this.getUserCountryInfo(this.userData.residence, "residence");
	}
	
	getUserCountryInfo(idCountry: any, countryType: 'homeland' | 'residence') {
		this.userService.getUserCountry(idCountry).subscribe(
			(res: any) => {
				const countryName = res.country_name;
				
				this.setUserCountryName(countryType, countryName);
			},
			(error: any) => {
				this.setUserCountryName(countryType, 'Not specified');
			}
		);
	}
	setUserCountryName(countryType: 'homeland' | 'residence', countryName: string) {
		if (countryType === 'homeland') {
			this.userCountries.homelandName = countryName;
		} else if (countryType === 'residence') {
			this.userCountries.residenceName = countryName;
		}
	}

	getUserPosts(){
		this.postsService.getUserPosts(this.userId).subscribe((res:any)=>{
			this.posts = res;
		})
	}
	getUserInterests(){
		this.userService.getUserInterests(this.userId).subscribe((res: any) => {
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