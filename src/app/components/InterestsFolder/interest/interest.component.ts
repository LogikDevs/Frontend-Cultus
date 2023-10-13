import { Component, Input } from '@angular/core';
import { Interest } from './interest.model';
import { GetInterestsService } from 'src/app/services/get-interests.service';

@Component({
	selector: 'app-interest',
	templateUrl: './interest.component.html',
	styleUrls: ['./interest.component.scss']
})
export class InterestComponent {
	@Input() interest: Interest;

	constructor(private interestService: GetInterestsService) { }

	ngDoCheck(){
		const VisualInterest = document.getElementById("InterestVisual_"+this.interest.id_label);
		const insertId = this.interest.id_label;

		if (this.interestService.NewUserInterestsArray.includes(insertId)){
			if (VisualInterest) VisualInterest.style.backgroundColor = "#1a1919";
		}
	}
	AddInterestFunction() {
		const VisualInterest = document.getElementById("InterestVisual_"+this.interest.id_label);
		const insertId = this.interest.id_label;
		const isInterestAlreadyAdded = this.interestService.NewUserInterestsArray.includes(insertId);
	
		if (isInterestAlreadyAdded) {
			const removedElementArray = this.interestService.NewUserInterestsArray.filter(item => item !== insertId);
			this.interestService.NewUserInterestsArray = removedElementArray;
			
			if (VisualInterest) VisualInterest.style.backgroundColor = "#27272b";
		}
		if (!isInterestAlreadyAdded){
			this.interestService.NewUserInterestsArray.push(insertId);
			if (VisualInterest) VisualInterest.style.backgroundColor = "#1a1919";
		}
 	}
}

