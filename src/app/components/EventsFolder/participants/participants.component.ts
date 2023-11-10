import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent {
    @Input() type:string = "event" || "group";
    @Input() participant:any;

    constructor(
		private router: Router
    ){}

    toProfile(){
      	this.router.navigateByUrl('/profile/'+this.participant.id);
    }
}
