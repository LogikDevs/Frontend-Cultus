import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userschat',
  templateUrl: './userschat.component.html',
  styleUrls: ['./userschat.component.scss']
})
export class UserschatComponent {
	@Input() userChat:any;
	@Input() userId:any;

	userChatName:any;

	userDirection:any;

	pfpUrl:any;
	Url_profile_pic:string = "http://localhost:8000/storage/profile_pic/"

	@Output() ChangeRoute: any = new EventEmitter<number>();
	@Output() MessegeableUserInfo: any = new EventEmitter<any>();

	constructor(
		private router: Router
	){}
	ngOnInit(){
		this.userDirection = this.userChat.conversation.participants;
		this.decideWhoIsTheUser();
		this.setUsernames();
		this.checkProfilePic();
	}
	decideWhoIsTheUser(){
		this.userDirection.forEach((participant:any) => {
			if (participant.messageable_id !== this.userId) {
				this.userDirection = participant.messageable
			}
		});
	}
	setUsernames(){
		this.userChatName = this.userDirection.name + " " + this.userDirection.surname
	}
	checkProfilePic(){
		if (this.userDirection.profile_pic != null) this.pfpUrl = this.Url_profile_pic + this.userDirection.profile_pic;
		
		if (this.userDirection.profile_pic === null) this.pfpUrl= "assets/post-images/profile_def.jpg"
	}
	displayConversation(){
		this.ChangeRoute.emit(this.userChat.conversation_id);
		this.MessegeableUserInfo.emit(this.userChat)
	}
}
