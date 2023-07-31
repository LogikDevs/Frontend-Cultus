import { Component } from '@angular/core';
import { GetInterestsService } from 'src/app/services/get-interests.service';
import { Interest } from '../interest/interest.model';
import { Router } from '@angular/router';


@Component({
	selector: 'app-select-interest',
	templateUrl: './select-interest.component.html',
	styleUrls: ['./select-interest.component.scss']
})
export class SelectInterestComponent {
	userId = localStorage.getItem("IdUser");
	interests: Interest[] = [];
	filteredInterests: Interest[] = [];
	constructor(private interestService: GetInterestsService, private router: Router) { }
	ngOnInit(){
		this.getInterests();
	}
	getInterests(){
		this.interestService.getInterests().subscribe((res:any)=>{
			this.interests = res;
			this.filteredInterests = res;
		});
	}
	onInterestsSearch(data:Event){
		const ReceivedText = (data.target as HTMLInputElement).value.toLowerCase();
		if (ReceivedText.length >= 2) {
			this.filterInterests(ReceivedText);
		} else {
			this.filteredInterests = this.interests;
	  	}
	}
	filterInterests(dataReceived: string) {
		this.filteredInterests = this.interests.filter(interest =>
			interest.interest.toLowerCase().startsWith(dataReceived.toLowerCase())
		  );
	}
	sendInterests(){
		const InterestsArray:any = this.interestService.NewUserInterestsArray;
		for (let i = 0; i < InterestsArray.length; i++){
			this.interestService.sendInterests(this.userId, InterestsArray[i]);
		}
		this.router.navigateByUrl('/home');
	}
}
