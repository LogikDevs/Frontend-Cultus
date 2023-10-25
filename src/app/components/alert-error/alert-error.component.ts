import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-error',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.scss']
})
export class AlertErrorComponent {
    @Input() Message:string;
	visibility:boolean = true;
	constructor(){}
	
	ngOnInit(){
		setTimeout(() => {
			this.hideComponent();
		}, 4000);
	}
	hideComponent(){
		this.visibility = false;
	};
}
