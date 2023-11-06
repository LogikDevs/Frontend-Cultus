import { Component } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-suggestedevents',
  templateUrl: './suggestedevents.component.html',
  styleUrls: ['./suggestedevents.component.scss']
})
export class SuggestedeventsComponent {
  	events:any = []
	alreadyJoinedEvents:any;

	CompleteMessage = {
		Message: "You have succesfully left the Event.",
		visibility: false
	}

  	constructor(
		private eventService: EventService
  	) { }
  	ngOnInit(){
		this.getEvents();
		this.checkIfEventMember();
	}
	getEvents(){
		this.eventService.getEventsFromInterests().subscribe((res:any)=>{
			console.log(res);
	        this.events = res;
        })
	}
	checkIfEventMember(){
		this.eventService.getUserFollowedEvents().subscribe((res:any)=>{
			this.alreadyJoinedEvents = res;
		})
	}

	OnCompleteAlert(){
		this.CompleteMessage.visibility = true;
		setTimeout(() => {
			this.hideComponent(true);
		}, 4000);
	}
	hideComponent(Complete:boolean){
		if (Complete == true) this.CompleteMessage.visibility = false;
	}
}
