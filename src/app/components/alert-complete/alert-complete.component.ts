import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-complete',
  templateUrl: './alert-complete.component.html',
  styleUrls: ['./alert-complete.component.scss']
})
export class AlertCompleteComponent {
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

