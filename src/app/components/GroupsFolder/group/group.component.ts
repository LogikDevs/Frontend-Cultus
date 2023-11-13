import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { GetUserService } from 'src/app/services/get-user.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {

	@Input() GroupToDisplay:any;

	userId: any;
	isAdmin:boolean;

    groupData:any;
	groupParticipants:any;

	type="group";

	Section:boolean = true;

	groupCover:string = "";
	defaultUrlCover:string = "http://localhost:8002/storage/picture/"

	createPostComponentVisibility: boolean = false;

    constructor(
		private userService: GetUserService,
		private route: ActivatedRoute,
		private groupService: GroupService
	){}
	
	ngOnChanges(){
		this.getGroup();
		this.getParticipants();
		this.checkIfIsAdmin();
		this.checkCover();
	}
	getUser() {
		this.userService.getUser().subscribe((res: any) => {
			this.userId = res.id;
		})
	}
	ChangeSection(type:boolean){
		if (type != this.Section) this.Section = type;
	}
	getGroup(){
		this.groupService.getGroupData(this.GroupToDisplay).subscribe((res:any)=>{
			this.groupData = res;
		})
	}
	getParticipants(){
		this.groupService.getGroupParticipants(this.GroupToDisplay).subscribe((res:any)=>{
			this.groupParticipants = res;
		})
	}
	checkCover(){
		if (this.groupData.picture) this.groupCover = this.defaultUrlCover + this.groupData.picture;
	}
	checkIfIsAdmin() {
		
		if (this.userId === this.groupData.admin.id) this.isAdmin = true;
	}
	postPublished(published: boolean) {
		this.createPostComponentVisibility = false;
		if (published) location.reload();
	}
}
