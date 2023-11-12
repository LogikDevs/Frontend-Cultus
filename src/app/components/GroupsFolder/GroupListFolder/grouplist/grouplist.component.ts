import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grouplist',
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.scss']
})
export class GrouplistComponent {
    @Input() groupToDisplay:any
    pfpUrl:any = "";
    Url_Picture:string = "http://localhost:8002/public/picture/"

    @Output() ChangeGroup: any = new EventEmitter<number>();
    constructor(){}
    ngOnInit(){
        this.checkProfilePic();
    }
    displayGroup(){
        this.ChangeGroup.emit(this.groupToDisplay.id_group);
	} 
    checkProfilePic(){
		if (this.groupToDisplay.picture != null) this.pfpUrl = this.Url_Picture + this.groupToDisplay.picture;
		
		if (this.groupToDisplay.picture === null) this.pfpUrl= "assets/post-images/profile_def.jpg"
	}
}
