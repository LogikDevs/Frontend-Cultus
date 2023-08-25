import { Component } from '@angular/core';
import { GetInterestsService } from 'src/app/services/get-interests.service';
import { NewEventData } from './create-event.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
    eventMultimedia:File;

    constructor(public interestService: GetInterestsService) { }
	
    sendCreatedEvent(FormData:any){
		const eventData: NewEventData = {
			name: FormData.EventName,
			description: FormData.EventDescription,
			InitDate: FormData.InitDate,
			CloseDate: FormData.CloseDate,
      		multimedia_file: FormData.multimedia_file,
      		Type: FormData.EventType
		}
        console.log(eventData);
    }
    showEventInterestSelection(){
        this.interestService.displaySelectInterest = true;
    }
    onFileChange(event: any) {
		this.eventMultimedia = event.target.files[0];
	}
}
