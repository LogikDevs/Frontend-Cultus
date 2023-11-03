import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-joinedgroup',
  templateUrl: './joinedgroup.component.html',
  styleUrls: ['./joinedgroup.component.scss']
})
export class JoinedgroupComponent {
	pictureUrlDefault:string = "http://localhost:8002/picture/"
	groupPicture:string = "";

	@Input() group:any
    constructor(
		private groupService: GroupService,
        private router: Router
    ){}
	ngOnInit(){
		this.checkPicture();
	}
	checkPicture(){
		if (this.group.picture) this.groupPicture = this.pictureUrlDefault + this.group.picture
	}
    joinGroup(){
        this.router.navigateByUrl('/group/'+ this.group.id_group);
	} 
}