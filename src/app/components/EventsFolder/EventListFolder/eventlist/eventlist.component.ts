import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-eventlist',
	templateUrl: './eventlist.component.html',
	styleUrls: ['./eventlist.component.scss']
})
export class EventlistComponent {
	@Input() eventToDisplay: any
	pfpUrl: any = "";
	Url_Picture: string = "http://localhost:8003/storage/cover_event/"

	@Output() ChangeEvent: any = new EventEmitter<number>();
	constructor() { }
	ngOnInit() {
		console.log(this.eventToDisplay);
		this.checkProfilePic();
	}
	displayEvent() {
		this.ChangeEvent.emit(this.eventToDisplay.event.id);
	}
	checkProfilePic() {
		if (this.eventToDisplay.event.cover != null) this.pfpUrl = this.Url_Picture + this.eventToDisplay.event.cover;

		if (this.eventToDisplay.event.cover === null) this.pfpUrl = "assets/post-images/profile_def.jpg"
	}
}
