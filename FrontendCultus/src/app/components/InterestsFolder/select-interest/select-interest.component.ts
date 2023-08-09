import { Component, Input } from '@angular/core';
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
	userInterests:any[];
	
	DataBaseInterests:any[];
	NewInterests:any[];
	InterestsToDelete:any[];
	InterestsToAdd:any[];

	@Input() postInterestType: boolean = false;
	@Input() WindowVisibility: boolean = true;

	constructor(private interestService: GetInterestsService, private router: Router) { }

	ngOnInit(){
		if (this.postInterestType == false) this.getUserInterests();
		this.getInterests();
	}

	getInterests(){
		this.interestService.getInterests().subscribe((res:any)=>{
			this.interests = res;
			this.filteredInterests = res;
		})
	}

	getUserInterests(){
		this.interestService.getUserInterests(this.userId).subscribe((res: any) => {

			this.interestService.NewUserInterestsArray = Object.values(res.interests).map((item:any) => item.id_label);
			
			this.DataBaseInterests = Object.values(res.interests).map((item:any) => item.id_label);
		})
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
		)
	}

	sendInterests(){
		if (this.postInterestType == true) {
			this.interestService.displaySelectInterest = false;
			this.WindowVisibility = false;
		}
		if (this.postInterestType == false) this.sendUserInterests();
	}
	sendUserInterests(){
		const InterestsArray:any = this.interestService.NewUserInterestsArray;
		
		this.InterestsToAdd = InterestsArray.filter((item:any) => !this.DataBaseInterests.includes(item));
		this.InterestsToDelete = this.DataBaseInterests.filter((item: any) => !InterestsArray.includes(item));

		this.AddInterests(this.InterestsToAdd); 
		this.DeleteInterests(this.InterestsToDelete);
	}
	AddInterests(interest:any){
		interest.forEach((item: any) => {
			this.interestService.sendUserInterests(this.userId, item).subscribe(res => {});
		});
	}
	DeleteInterests(interest:any){
		interest.forEach((item: any) => {
			this.interestService.deleteInterest(item, this.userId).subscribe(res => {
				console.log(res);
			})
		})
	}
}

