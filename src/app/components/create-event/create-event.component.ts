import { Component } from '@angular/core';
import { GetInterestsService } from 'src/app/services/get-interests.service';
import { NewEventData } from './create-event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
    eventMultimedia:File;
    
	CompleteMessage = {
		Message: "the Event has been created.",
		visibility: false
	}
	ErrorMessage = {
		Message: "There was an error during the process.",
		visibility: false
	}

    constructor(
		public interestService: GetInterestsService,
		private eventService: EventService
	) { }

    sendCreatedEvent(FormData:any){
		const eventData: NewEventData = {
			name: FormData.EventName,
			description: FormData.EventDescription,
			text: FormData.EventText,
			start_date: FormData.InitDate,
			end_date: FormData.CloseDate,
			cover: this.eventMultimedia,
			private: FormData.EventType
		}
		if (eventData.private == "true") eventData.private = 1;
		if (eventData.private == "false") eventData.private = 0;

		this.eventService.createEvent(eventData).subscribe((res:any)=>{
			if (res.status === 201) {
				this.OnCompleteAlert();
			}
			if (res.status !== 201) {			
				this.OnErrorAlert()
			}
		}, (error:any)=>{
			this.OnErrorAlert()
		})
    }
    showEventInterestSelection(){
        this.interestService.displaySelectInterest = true;
    }
    onFileChange(event: any) {
		this.eventMultimedia = event.target.files[0];
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
