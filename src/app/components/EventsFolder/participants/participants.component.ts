import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent {
    @Input() type:string = "event" || "group";
    @Input() participant:any;
}
