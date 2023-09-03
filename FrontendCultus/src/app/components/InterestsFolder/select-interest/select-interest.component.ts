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
	
	DataBaseInterests:any[];

	InterestsToDelete:any[];
	InterestsToAdd:any[];

	@Input() SelectInterestType: string = "user";
	@Input() WindowVisibility: boolean = true;

	constructor(private interestService: GetInterestsService, private router: Router) { }

	ngOnInit(){
		
		if (this.SelectInterestType == "user") this.getUserInterests();
		if (this.SelectInterestType == "post") console.log(this.SelectInterestType);
		if (this.SelectInterestType == "group") console.log(this.SelectInterestType);
		if (this.SelectInterestType == "event") console.log(this.SelectInterestType);
		this.getInterests();
	}

	getInterests(){
		this.interestService.getInterests().subscribe((res:any)=>{
			this.interests = res;
			this.filteredInterests = res;
		})
	}
	onInterestsSearch(data:Event){
		const ReceivedText = (data.target as HTMLInputElement).value.toLowerCase();
		
		if (ReceivedText.length >= 2) this.filterInterests(ReceivedText);
		else this.filteredInterests = this.interests;
	}
	filterInterests(dataReceived: string) {
		this.filteredInterests = this.interests.filter(interest =>
			interest.interest.toLowerCase().startsWith(dataReceived.toLowerCase())
		)
	}

	sendInterests(){
		if (["post", "group", "event"].includes(this.SelectInterestType)) {
			this.interestService.displaySelectInterest = false;
			this.WindowVisibility = false;
		}
		if (this.SelectInterestType == "user") this.sendUserInterests();
 	}
	
	
	
	getUserInterests(){
		this.interestService.getUserInterests(this.userId).subscribe((res: any) => {

			this.interestService.NewUserInterestsArray = Object.values(res.interests).map((item:any) => item.id_label);
			
			this.DataBaseInterests = Object.values(res.interests).map((item:any) => item.id_label);
		})
	}
	sendUserInterests(){
		const InterestsArray:any = this.interestService.NewUserInterestsArray;
		
		this.InterestsToAdd = InterestsArray.filter((item:any) => !this.DataBaseInterests.includes(item));
		this.InterestsToDelete = this.DataBaseInterests.filter((item: any) => !InterestsArray.includes(item));

		this.AddUserInterests(this.InterestsToAdd); 
		this.DeleteUserInterests(this.InterestsToDelete);
		this.interestService.NewUserInterestsArray = [];
		this.DataBaseInterests=[];
		this.router.navigateByUrl('/home');
	}
	AddUserInterests(interest:any){
		interest.forEach((item: any) => {
			this.interestService.sendUserInterests(this.userId, item).subscribe(res => {});
		});
	}
	DeleteUserInterests(interest:any){
		interest.forEach((item: any) => {
			this.interestService.deleteInterest(item, this.userId).subscribe(res => {})
		})
	}
}

