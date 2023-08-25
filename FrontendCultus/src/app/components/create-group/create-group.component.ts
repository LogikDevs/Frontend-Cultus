import { Component } from '@angular/core';
import { GetInterestsService } from 'src/app/services/get-interests.service';
import { NewGroupData } from './create-group.model';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent {
  	groupMultimedia:File;

	constructor(public interestService: GetInterestsService) { }

  	sendCreatedGroup(FormData:any){
  		const groupData: NewGroupData = {
    		name: FormData.GroupName,
    		description: FormData.GroupDescription,
    		multimedia_file: FormData.multimedia_file,
    		Type: FormData.GroupType
 		}
      	console.log(groupData);
  	}
  	showGroupInterestSelection(){
      	this.interestService.displaySelectInterest = true;
  	}
  	onFileChange(event: any) {
  		this.groupMultimedia = event.target.files[0];
	}
}
