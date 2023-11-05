import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-joinedevent',
  templateUrl: './joinedevent.component.html',
  styleUrls: ['./joinedevent.component.scss']
})
export class JoinedeventComponent {
	pictureUrlDefault:string = ""
	eventPicture:string = "";

	@Input() event:any
    constructor(
        private router: Router
    ){}
	ngOnInit(){
		this.checkPicture();
	}
	checkPicture(){
		if (this.event.picture) this.eventPicture = this.pictureUrlDefault + this.event.picture
	}
    joinEvent(){
        this.router.navigateByUrl('/event/'+ this.event[0].id);
	} 
}
