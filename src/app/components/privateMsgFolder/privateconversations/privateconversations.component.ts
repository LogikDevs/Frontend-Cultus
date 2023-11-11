import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { GetUserService } from 'src/app/services/get-user.service';

@Component({
  selector: 'app-privateconversations',
  templateUrl: './privateconversations.component.html',
  styleUrls: ['./privateconversations.component.scss']
})
export class PrivateconversationsComponent {
	@Input() UserConversationId:any = Number(this.route.snapshot.params['id']);
	
	ChatIdToDisplay:any
	PrivateChats:any;

	userInformation:any;

	userId:any;

	directMessage:number;

	chatProfile:string = "";
	defaultUrlProfile:string = "http://localhost:8000/storage/profile_pic/"

	displayedChat:boolean;

  	constructor(
  		private route: ActivatedRoute,
		private router: Router,
		private chatService: ChatService,
		private userService: GetUserService
  	){}
  	ngOnInit(){
		
		this.getUser();
		this.createNewConversation();
		this.getPrivateChats();
  	}

	getUser(){
		this.userService.getUser().subscribe((res:any)=>{
			this.userId = res.id;
		})
	}
  	getPrivateChats(){
		this.chatService.getUserPrivateConversations().subscribe((res:any)=>{
			this.PrivateChats = res.data;
		})
	}
	createNewConversation(){
		this.chatService.createPrivateChat(this.UserConversationId).subscribe((res:any)=>{
			this.directMessage = res.id;
			this.ChatIdToDisplay = this.directMessage;
			this.displayedChat = true;
		})
	}
	displayUserData(userData:any){
		userData.conversation.participants.forEach((participant:any) => {
			if (participant.messageable_id !== this.userId){ 
				this.userInformation = participant.messageable;
				this.chatProfile = this.defaultUrlProfile + participant.messageable.profile_pic;
			}
		});
	}
	
	displayConversation(newRoute:any){
		this.ChatIdToDisplay = newRoute;
		this.displayedChat = true;
	}
}
