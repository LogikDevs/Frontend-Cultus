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

	constructor(public interestService: GetInterestsService, private groupService: GroupService) { }

  	sendCreatedGroup(FormData:any){
  		const groupData: NewGroupData = {
    		name: FormData.GroupName,
    		description: FormData.GroupDescription,
    		multimedia_file: this.groupMultimedia,
    		Type: FormData.GroupType
 		}
		this.groupService.createGroup(groupData).subscribe((res:any)=>{
			if (res.status === 201) console.log("Mostrar mensaje de Grupo Creado")
		}, (error:any)=>{
			console.log("Mostrar mensaje de Error al crear Grupo");
		})
	}

  	showGroupInterestSelection(){
      	this.interestService.displaySelectInterest = true;
  	}
  	onFileChange(event: any) {
  		this.groupMultimedia = event.target.files[0];
	}
}