import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { GetUserService } from 'src/app/services/get-user.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
	@Input() EventId:any = Number(this.route.snapshot.params['id']);

	userId:any;

	eventCover:string = "";
	defaultUrlCover:string = "http://localhost:8003/cover_event/"


	eventData:any = "";
	eventType:any;

	createPostComponentVisibility:boolean = false;

    constructor(
		private route: ActivatedRoute,
		private eventService: EventService,
		private userService: GetUserService
	){}
	ngOnInit(){
		this.getEvent();
		
	}
	getEvent(){
		this.eventService.getEventData(this.EventId).subscribe((res:any)=>{
			this.eventData = res;
			this.checkEventType();
			console.log(this.eventData);
		})
	}
	checkCover(){
		if (this.eventData[0].cover) this.eventCover = this.defaultUrlCover + this.eventData[0].cover;
	}
	getUser(){
    	this.userService.getUser().subscribe((res:any)=>{
      		this.userId = res.id;
    	})
  	}
	checkEventType(){
		if (this.eventData[0].private == 1) this.eventType = "Private";
		if (this.eventData[0].private == 0) this.eventType = "Public";
	}

	ShowPostCreationComponent(){
		this.createPostComponentVisibility = true;
	}

}
