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
		  	InitDate: FormData.InitDate,
		  	CloseDate: FormData.CloseDate,
        	multimedia_file: FormData.multimedia_file,
			Type: FormData.EventType
		}
		if (eventData.Type == "true") eventData.Type = true;
		if (eventData.Type == "false") eventData.Type = false;

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
