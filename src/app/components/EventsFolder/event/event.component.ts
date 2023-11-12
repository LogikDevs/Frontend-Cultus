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

	isAdmin:boolean;

	eventCover:string = "";
	defaultUrlCover:string = "http://localhost:8003/storage/cover_event/"


	eventData:any = "";
	eventType:any;

	createPostComponentVisibility:boolean = false;

    constructor(
		private route: ActivatedRoute,
		private eventService: EventService,
		private userService: GetUserService
	){}
	ngOnInit(){
		this.getUser();
		this.getEvent();
	}
	getEvent(){
		this.eventService.getEventData(this.EventId).subscribe((res:any)=>{
			this.eventData = res;
			this.checkCover();
			this.checkEventType();
			this.checkIfIsAdmin();
		})
	}
	checkCover(){
		if (this.eventData.event.cover) this.eventCover = this.defaultUrlCover + this.eventData.event.cover;
	}
	getUser(){
    	this.userService.getUser().subscribe((res:any)=>{
      		this.userId = res.id;
    	})
  	}
	checkEventType(){
		if (this.eventData.event.private == 1) this.eventType = "Private";
		if (this.eventData.event.private == 0) this.eventType = "Public";
	}

	checkIfIsAdmin(){
		if (this.userId === this.eventData.admin.id) this.isAdmin = true;
	}
	ShowPostCreationComponent(){
		this.createPostComponentVisibility = true;
	}
	postPublished(published:boolean){
		this.createPostComponentVisibility = false;
		if (published) location.reload();
	}
}
