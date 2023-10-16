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
			if (res.status === 201) console.log("Mostrar mensaje de Evento Creado")
		}, (error:any)=>{
			console.log("Mostrar mensaje de Error al crear Evento");
		})
    }
    showEventInterestSelection(){
        this.interestService.displaySelectInterest = true;
    }
    onFileChange(event: any) {
		this.eventMultimedia = event.target.files[0];
	}
}
