import { Component, EventEmitter, Output } from '@angular/core';
import { GetInterestsService } from 'src/app/services/get-interests.service';
import { NewEventData } from './create-event.model';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';

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

	@Output() ComponentRemoved = new EventEmitter<boolean>();

	imageUrl:any;

	createdEvent:any;
    constructor(
		public interestService: GetInterestsService,
		private eventService: EventService,
		private router: Router
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
				this.sendEventInterests(res.body.id_event);
				this.createdEvent = res.body;
				this.OnCompleteAlert();
			}
			if (res.status !== 201) {			
				this.OnErrorAlert()
			}
		}, (error:any)=>{
			this.OnErrorAlert()
		})
    }

	sendEventInterests(createdEventId:any){
		this.interestService.NewUserInterestsArray.forEach(element => {
			this.eventService.sendEventInterests(element.id_label, createdEventId).subscribe((res:any)=>{})
		});
	}

    showEventInterestSelection(){
        this.interestService.displaySelectInterest = true;
    }
    onFileChange(event: any) {
		this.eventMultimedia = event.target.files[0];
		if (this.eventMultimedia) {
			const reader = new FileReader();
			reader.onload = (event) => {
				this.imageUrl = event.target?.result;
			}
			reader.readAsDataURL(this.eventMultimedia);
		}
	}

	OnCompleteAlert(){
		this.CompleteMessage.visibility = true;
		this.ErrorMessage.visibility = false;
		setTimeout(() => {
			this.router.navigateByUrl("/event/" + this.createdEvent.id_event);
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

	ComponentRemove(){
		this.ComponentRemoved.emit(true);
	}
}
