import { Component } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.scss']
})
export class MyeventsComponent {
	events:any = []
  	constructor(
		private eventService: EventService
  	) { }
  	ngOnInit(){
		this.getGroups();
	}
	getGroups(){
		this.eventService.getUserFollowedEvents().subscribe((res:any)=>{
			this.events = res;
  		})
	}
}
