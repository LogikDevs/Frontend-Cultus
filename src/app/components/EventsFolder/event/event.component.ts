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
	userId: any;

	@Input() EventToDisplay: any;

	isAdmin: boolean;

	eventCover: string = "";
	defaultUrlCover: string = "http://localhost:8003/storage/cover_event/"


	eventData: any = "";
	eventType: any;

	createPostComponentVisibility: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private eventService: EventService,
		private userService: GetUserService
	) { }
	ngOnChanges() {
		this.getUser();
		this.getEvent();
	}

	getUser() {
		this.userService.getUser().subscribe((res: any) => {
			this.userId = res.id;
		})
	}
	getEvent() {
		this.eventService.getEventData(this.EventToDisplay).subscribe((res: any) => {
			this.eventData = res;
			this.checkCover();
			this.checkEventType();
			this.checkIfIsAdmin();
		})
	}
	checkCover() {
		if (this.eventData.event.cover) this.eventCover = this.defaultUrlCover + this.eventData.event.cover;
	}

	checkEventType() {
		if (this.eventData.event.private == 1) this.eventType = "Private";
		if (this.eventData.event.private == 0) this.eventType = "Public";
	}

	checkIfIsAdmin() {
		if (this.userId === this.eventData.admin.id) this.isAdmin = true;
	}
	ShowPostCreationComponent() {
		this.createPostComponentVisibility = true;
	}
	postPublished(published: boolean) {
		this.createPostComponentVisibility = false;
		if (published) location.reload();
	}
}
