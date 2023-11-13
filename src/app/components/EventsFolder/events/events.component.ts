import { Component } from '@angular/core';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent {

    Section: boolean = true;

    constructor() { }

    ChangeSection(type: boolean) {
        if (type != this.Section) this.Section = type;
    }
}
