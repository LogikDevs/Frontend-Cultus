import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent {
    @Input() type:string = "event" || "group";
    @Input() participant:any;

	defaultUrl:any = "http://localhost:8000/storage/profile_pic/"
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
