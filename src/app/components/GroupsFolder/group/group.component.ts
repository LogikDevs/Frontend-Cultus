import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_URLs } from 'src/app/common/globalVariables';
import { ChatService } from 'src/app/services/chat.service';
import { GetUserService } from 'src/app/services/get-user.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
	selector: 'app-group',
	templateUrl: './group.component.html',
	styleUrls: ['./group.component.scss']
})
export class GroupComponent {

	@Input() GroupToDisplay: any;

	groupData: any;
	groupParticipants: any;

	type = "group";

	Section: boolean = true;

	groupCover: string = "";
	defaultUrlCover: string = API_URLs.GROUPS+"storage/picture/"

	createPostComponentVisibility: boolean = false;


	constructor(
		private route: ActivatedRoute,
		private groupService: GroupService
	) { }

	ngOnChanges() {
		this.getGroup();
		this.getParticipants();
		this.checkCover();
	}

  ChangeSection(type: boolean) {
		if (type != this.Section) this.Section = type;
	}
	getGroup() {
		this.groupService.getGroupData(this.GroupToDisplay).subscribe((res: any) => {
			this.groupData = res;
		})
	}
	getParticipants() {
		this.groupService.getGroupParticipants(this.GroupToDisplay).subscribe((res: any) => {
			this.groupParticipants = res;
		})
	}
	checkCover() {
		if (this.groupData.picture) this.groupCover = this.defaultUrlCover + this.groupData.picture;
	}
  
	ShowPostCreationComponent() {
		this.createPostComponentVisibility = true;
	}
  
	postPublished(published: boolean) {
		this.createPostComponentVisibility = false;
		if (published) location.reload();
	}
}
