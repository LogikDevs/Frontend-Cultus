import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent {
    @Input() user:any;

    pfpUrl:any = "";
    Url_profile_pic:string = "http://localhost:8000/storage/profile_pic/"

    constructor(
        private router: Router
    ){}
    
    ngOnInit(){
        this.checkProfilePic();
    }
    checkProfilePic(){
		if (this.user.profile_pic != null) this.pfpUrl = this.Url_profile_pic + this.user.profile_pic;
		
		if (this.user.profile_pic === null) this.pfpUrl= "assets/post-images/profile_def.jpg"
	}
    seeUser(){
        this.router.navigateByUrl("/profile/"+this.user.id);
    }
}
