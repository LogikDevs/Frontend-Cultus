import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-list-container',
  templateUrl: './group-list-container.component.html',
  styleUrls: ['./group-list-container.component.scss']
})
export class GroupListContainerComponent {
    @Input() GroupId:any = Number(this.route.snapshot.params['id']);
	@Input() GroupIdFromComponent:any = null;

    GroupToDisplay:any;

    myGroups:any;
    constructor(
        private groupService: GroupService,
        private route: ActivatedRoute
    ){}
    ngOnInit(){
        this.WhichToUse();
        this.getMyGroups();
    }
    WhichToUse(){
		if (this.GroupIdFromComponent === null){ 
            this.GroupToDisplay = this.GroupId
        }

		if (this.GroupIdFromComponent) {
            this.GroupToDisplay = this.GroupIdFromComponent
        }
	}
    getMyGroups(){
		this.groupService.getMyGroups().subscribe((res:any)=>{
	      	this.myGroups = res;
	    })
	}
    displayGroup(group:any){
        this.GroupToDisplay = group;
    }
}
