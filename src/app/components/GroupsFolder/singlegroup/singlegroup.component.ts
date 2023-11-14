import { Component, EventEmitter, Input, Output } from '@angular/core';
import { API_URLs } from 'src/app/common/globalVariables';
import { GroupService } from 'src/app/services/group.service';

@Component({
	selector: 'app-singlegroup',
	templateUrl: './singlegroup.component.html',
	styleUrls: ['./singlegroup.component.scss']
})
export class SinglegroupComponent {
	pictureUrlDefault: string = API_URLs.GROUPS+"storage/picture/"
	groupPicture: string = ""
	joinButton: string = "Join";
	joined: boolean = false;

	@Input() group: any;
	@Input() alreadyJoinedGroups: any;

	@Output() leftGroup = new EventEmitter<void>();

	constructor(
		private groupService: GroupService
	) { }
	ngOnInit() {
		this.checkIfAlreadyJoinedGroup();
		this.checkPicture();
	}
	checkPicture() {
		if (this.group.picture) this.groupPicture = this.pictureUrlDefault + this.group.picture;
	}
	checkIfAlreadyJoinedGroup() {
		this.alreadyJoinedGroups.forEach((joinedGroup: any) => {
			if (this.group.id_group === joinedGroup.id_group) {
				this.joined = true
				this.joinButton = "Leave"
			}
		});
	}
	joinGroup(join: boolean) {
		if (join === false) {
			this.groupService.joinGroup(this.group.id_group).subscribe((res: any) => {
				if (res.ok === true) {
					this.joinButton = "Leave"
					this.joined = true;
				}
			})
		}
		if (join === true) {
			this.groupService.leaveGroup(this.group.id_group).subscribe((res: any) => {
				this.leftGroup.emit();
				this.joinButton = "Join"
				this.joined = false;
			})
		}
	}
}
