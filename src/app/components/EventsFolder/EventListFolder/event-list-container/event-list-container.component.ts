import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
	selector: 'app-event-list-container',
	templateUrl: './event-list-container.component.html',
	styleUrls: ['./event-list-container.component.scss']
})
export class EventListContainerComponent {
	@Input() EventId: any = Number(this.route.snapshot.params['id']);
	@Input() EventIdFromComponent: any = null;

	EventToDisplay: any;

	myEvents: any;

	constructor(
		private eventService: EventService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		this.WhichToUse();
        this.getMyEvents();
	}
	WhichToUse() {
		if (this.EventIdFromComponent === null) {
			this.EventToDisplay = this.EventId;
		}
		if (this.EventIdFromComponent) {
			this.EventToDisplay = this.EventIdFromComponent;
		}
	}
	getMyEvents() {
		this.eventService.getUserFollowedEvents().subscribe((res: any) => {
			this.myEvents = res;
		})
	}
	displayEvent(event: any) {
		this.EventToDisplay = event;
		this.router.navigateByUrl('/event/'+this.EventToDisplay)
	}
}
