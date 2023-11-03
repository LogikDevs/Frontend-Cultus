import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { GetUserService } from 'src/app/services/get-user.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
    @Input() GroupId:any = Number(this.route.snapshot.params['id']);

    groupData:any;
	groupParticipants:any;

	type="group";

	eventCover:string = "";
	defaultUrlCover:string = "http://localhost:8002/public/picture/"

    constructor(
		private route: ActivatedRoute,
		private groupService: GroupService
	){}
	ngOnInit(){
		this.getEvent();
		this.getParticipants();
		this.checkCover();
	}
	getEvent(){
		this.groupService.getGroupData(this.GroupId).subscribe((res:any)=>{
			this.groupData = res;
		})
	}
	getParticipants(){
		this.groupService.getGroupParticipants(this.GroupId).subscribe((res:any)=>{
			this.groupParticipants = res;
		})
	}
	checkCover(){
		if (this.groupData.picture) this.eventCover = this.defaultUrlCover + this.groupData.picture;
	}
}
