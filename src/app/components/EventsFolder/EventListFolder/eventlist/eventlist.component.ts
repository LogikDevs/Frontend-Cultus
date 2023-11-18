import { Component, EventEmitter, Input, Output } from '@angular/core';
import { API_URLs } from 'src/app/common/globalVariables';

@Component({
	selector: 'app-eventlist',
	templateUrl: './eventlist.component.html',
	styleUrls: ['./eventlist.component.scss']
})
export class EventlistComponent {
	@Input() eventToDisplay: any
	pfpUrl: any = "";
	Url_Picture: string = API_URLs.EVENTS+"/storage/cover_event/"

	@Output() ChangeEvent: any = new EventEmitter<number>();
	constructor() { }
	ngOnInit() {
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
