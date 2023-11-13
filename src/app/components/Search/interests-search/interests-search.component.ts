import { Component, Input } from '@angular/core';
import { Interest } from '../../InterestsFolder/interest/interest.model';

@Component({
	selector: 'app-interests-search',
	templateUrl: './interests-search.component.html',
	styleUrls: ['./interests-search.component.scss']
})
export class InterestsSearchComponent {
	@Input() interest: Interest;

	constructor() { }
}
