import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-userschat',
  templateUrl: './userschat.component.html',
  styleUrls: ['./userschat.component.scss']
})
export class UserschatComponent {
	@Input() userChat:any;
	
	pfpUrl:any;
	Url_profile_pic:string = "http://localhost:8000/storage/profile_pic/"

	ngOnInit(){
		this.checkProfilePic();
	}
	checkProfilePic(){
		if (this.userChat.profile_pic != null) this.pfpUrl = this.Url_profile_pic + this.userChat.profile_pic;
		
		if (this.userChat.profile_pic === null) this.pfpUrl= "assets/post-images/profile_def.jpg"
	}
}
