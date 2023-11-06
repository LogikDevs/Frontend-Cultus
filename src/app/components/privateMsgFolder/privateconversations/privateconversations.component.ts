import { Component, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-privateconversations',
  templateUrl: './privateconversations.component.html',
  styleUrls: ['./privateconversations.component.scss']
})
export class PrivateconversationsComponent {
	PrivateChats:any;

	@Output() DisplayedChat:any;

	privateChat:boolean = true;

	chatProfile:string = "";
	defaultUrlProfile:string = "http://localhost:8002/public/picture/"

  	constructor(
  		private route: ActivatedRoute,
  		private groupService: GroupService
  	){}
  	ngOnInit(){
    	this.getPrivateChats();
  	}

  	getPrivateChats(){
		//Get private chats request
  	}
}
