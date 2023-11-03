import { Component } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-mygroups',
  templateUrl: './mygroups.component.html',
  styleUrls: ['./mygroups.component.scss']
})
export class MygroupsComponent {
	groups:any = []
  	constructor(
		private groupService: GroupService
  	) { }
  	ngOnInit(){
		this.getGroups();
	}
	getGroups(){
		this.groupService.getMyGroups().subscribe((res:any)=>{
			this.groups = res;
			console.log(this.groups);
  		})
	}
}
