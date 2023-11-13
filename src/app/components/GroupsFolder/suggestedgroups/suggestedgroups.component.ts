import { Component } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';

@Component({
	selector: 'app-suggestedgroups',
	templateUrl: './suggestedgroups.component.html',
	styleUrls: ['./suggestedgroups.component.scss']
})
export class SuggestedgroupsComponent {
	groups: any = []
	alreadyJoinedGroups: any;

	CompleteMessage = {
		Message: "You have succesfully left the Group.",
		visibility: false
	}

	constructor(
		private groupService: GroupService
	) { }
	ngOnInit() {
		this.getGroups();
		this.checkIfGroupMember();
	}
	getGroups() {
		this.groupService.getGroups().subscribe((res: any) => {
			this.groups = res;
		})
	}
	checkIfGroupMember() {
		this.groupService.getMyGroups().subscribe((res: any) => {
			this.alreadyJoinedGroups = res;
		})
	}

	OnCompleteAlert() {
		this.CompleteMessage.visibility = true;
		setTimeout(() => {
			this.hideComponent(true);
		}, 4000);
	}
	hideComponent(Complete: boolean) {
		if (Complete == true) this.CompleteMessage.visibility = false;
	}
}
