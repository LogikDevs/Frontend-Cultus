import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-joinedevent',
  templateUrl: './joinedevent.component.html',
  styleUrls: ['./joinedevent.component.scss']
})
export class JoinedeventComponent {

	@Input() event:any

	pictureUrlDefault:string = "http://localhost:8003/storage/cover_event/"
	eventPicture:string = "";
    constructor(
        private router: Router
    ){}
	ngOnInit(){
		this.checkPicture();
	}
	checkPicture(){
		if (this.event[0].cover) this.eventPicture = this.pictureUrlDefault + this.event[0].cover;
	}
    joinEvent(){
        this.router.navigateByUrl('/event/'+ this.event[0].id);
	} 
}
