import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { API_URLs } from 'src/app/common/globalVariables';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent {
    @Input() type:string = "event" || "group";
    @Input() participant:any;

	defaultUrl:any = API_URLs.AUTH+"storage/profile_pic/"
	pfpUrl:any= "";

    constructor(
		private router: Router
    ){}
    ngOnInit(){
      	this.checkProfilePic();
    }
    toProfile(){
      	this.router.navigateByUrl('/profile/'+this.participant.id);
    }
    checkProfilePic(){
		if (this.participant.profile_pic != null) this.pfpUrl = this.defaultUrl + this.participant.profile_pic;
		
		if (this.participant.profile_pic === null) this.pfpUrl= "assets/post-images/profile_def.jpg";
    };
}
