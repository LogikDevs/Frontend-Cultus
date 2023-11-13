import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-interests',
  templateUrl: './event-interests.component.html',
  styleUrls: ['./event-interests.component.scss']
})
export class EventInterestsComponent {
    @Input() interest: any;
}
