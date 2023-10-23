import { Component, Input } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-singlegroup',
  templateUrl: './singlegroup.component.html',
  styleUrls: ['./singlegroup.component.scss']
})
export class SinglegroupComponent {
	pictureUrlDefault:string = "http://localhost:8002/picture/"
	groupPicture:string = "/src/assets/Profile-Image/planeta.svg"
	joinButton:string = "Join"

	@Input() group:any
    constructor(
		private groupService: GroupService
	){}
	ngOnInit(){
		this.checkPicture();
	}
	checkPicture(){
		if (this.group.picture) this.groupPicture = this.pictureUrlDefault + this.group.picture
	}
	joinGroup(){
		this.groupService.joinGroup().subscribe((res:any)=>{
			if (res.status === 201){
				this.joinButton = "Leave"
			}
		})
	} 
}
