import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { API_URLs } from 'src/app/common/globalVariables';
import { EventService } from 'src/app/services/event.service';

@Component({
	selector: 'app-joinedevent',
	templateUrl: './joinedevent.component.html',
	styleUrls: ['./joinedevent.component.scss']
})
export class JoinedeventComponent {
	@Input() event: any

	pictureUrlDefault: string = API_URLs.EVENTS+"/storage/cover_event/"
	eventPicture: string = "";
	
	constructor(
		private router: Router
	) { }
	ngOnInit() {
		this.checkPicture();
	}
	checkPicture() {
		if (this.event.event.cover) this.eventPicture = this.pictureUrlDefault + this.event.event.cover;
	}
	joinEvent() {
		this.router.navigateByUrl('/event/' + this.event.event.id);
	}
}
