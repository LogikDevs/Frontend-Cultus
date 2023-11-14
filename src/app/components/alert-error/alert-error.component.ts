import { Component, Input, Output } from '@angular/core';

@Component({
	selector: 'app-alert-error',
	templateUrl: './alert-error.component.html',
	styleUrls: ['./alert-error.component.scss']
})
export class AlertErrorComponent {
	@Input() Message: string;
}
