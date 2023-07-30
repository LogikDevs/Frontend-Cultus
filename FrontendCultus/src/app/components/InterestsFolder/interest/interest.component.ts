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
	interestsArray:any[] = [];

	constructor(private interestService: GetInterestsService) { }
 	AddInterestFunction() {
		const insertId = this.interest.id_label;
		var canBeAdded = true;
		for(let i = 0; i < this.interestService.NewUserInterestsArray.length; i++){
			if (insertId == this.interestService.NewUserInterestsArray[i]){
				canBeAdded = false;
			}
		}
		if (canBeAdded == true){
    		this.interestService.NewUserInterestsArray.push(insertId);
			console.log(this.interestService.NewUserInterestsArray);
		}
 	}
}

