import { Component } from '@angular/core';
import { GetInterestsService } from 'src/app/services/get-interests.service';
import { NewGroupData } from './create-group.model';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent {
  	groupMultimedia:File;
	  CompleteMessage = {
		Message: "the Group has been created.",
		visibility: false
	}
	ErrorMessage = {
		Message: "There was an error during the process.",
		visibility: false
	}

	constructor(public interestService: GetInterestsService, private groupService: GroupService) { }

  	sendCreatedGroup(FormData:any){
  		const groupData: NewGroupData = {
    		name: FormData.GroupName,
    		description: FormData.GroupDescription,
    		multimedia_file: this.groupMultimedia,
    		Type: FormData.GroupType
 		}
		this.groupService.createGroup(groupData).subscribe((res:any)=>{
			if (res.status === 201){
				this.OnCompleteAlert()
			}
			if (res.status !== 201){
				this.OnErrorAlert()
			}
		}, (error:any)=>{
			this.OnErrorAlert()
		})
	}

  	showGroupInterestSelection(){
      	this.interestService.displaySelectInterest = true;
  	}
  	onFileChange(event: any) {
  		this.groupMultimedia = event.target.files[0];
	}


	OnCompleteAlert(){
		this.CompleteMessage.visibility = true;
		this.ErrorMessage.visibility = false;
		setTimeout(() => {
			this.hideComponent(true);
		}, 4000);
	}
	OnErrorAlert(){
		this.ErrorMessage.visibility = true;
		this.CompleteMessage.visibility = false;
		setTimeout(() => {
			this.hideComponent(false);
		}, 4000);
	}
	hideComponent(Complete:boolean){
		if (Complete == true) this.CompleteMessage.visibility = false;
		if (Complete == false) this.ErrorMessage.visibility = false;
	}
}