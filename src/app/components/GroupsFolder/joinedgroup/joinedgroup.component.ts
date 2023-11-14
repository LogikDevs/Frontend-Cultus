import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { API_URLs } from 'src/app/common/globalVariables';
import { GroupService } from 'src/app/services/group.service';

@Component({
	selector: 'app-joinedgroup',
	templateUrl: './joinedgroup.component.html',
	styleUrls: ['./joinedgroup.component.scss']
})
export class JoinedgroupComponent {
	pictureUrlDefault: string = API_URLs.GROUPS+"storage/picture/"
	groupPicture: string = "";

	leftGroup: boolean = false;

	@Input() group: any
	constructor(
		private groupService: GroupService,
		private router: Router
	) { }
	ngOnInit() {
		this.checkPicture();
	}
	checkPicture() {
		if (this.group.picture) this.groupPicture = this.pictureUrlDefault + this.group.picture
	}
	joinGroup() {
		this.router.navigateByUrl('/group/' + this.group.id_group);
	}
	leaveGroup() {
		this.groupService.leaveGroup(this.group.id_group).subscribe((res: any) => {
			this.leftGroup = true;
		})
	}
}
