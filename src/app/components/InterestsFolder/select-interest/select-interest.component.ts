import { Component, EventEmitter, Input, Output } from '@angular/core';
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

	@Output() InterestsModified = new EventEmitter<boolean>();

	constructor(
		private interestService: GetInterestsService, 
		private router: Router
	) { }

	ngOnInit(){
		if (this.SelectInterestType == "user") this.getUserInterests();
		if (this.SelectInterestType == "edit") this.getUserInterests();
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
		if (ReceivedText.length < 2) this.filteredInterests = this.interests;
	}
	filterInterests(dataReceived: string) {
		this.filteredInterests = this.interests.filter(interest =>
			interest.interest.toLowerCase().startsWith(dataReceived.toLowerCase())
		)
	}

	sendInterests(){
		if (["post", "event"].includes(this.SelectInterestType)) {
			this.interestService.displaySelectInterest = false;
			this.WindowVisibility = false;
			this.InterestsModified.emit(true);
		}
		if (["user", "edit"].includes(this.SelectInterestType)) { 
			this.sendUserInterests();
		}
 	}
	
	getUserInterests(){
		this.interestService.getUserInterests().subscribe((res: any) => {
			
			this.interestService.NewUserInterestsArray = Object.values(res.interests).map((item:any) => item);

			this.DataBaseInterests = Object.values(res.interests).map((item:any) => item);
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

		if (this.SelectInterestType == "user") this.router.navigateByUrl('/home');
		if (this.SelectInterestType == "edit") {
			this.interestService.displaySelectInterest = false;
			this.WindowVisibility = false;
			this.InterestsModified.emit(true);
		}
	}
	
	AddUserInterests(interest:any){
		interest.forEach((item: any) => {
			this.interestService.sendUserInterests(item.id_label).subscribe(res => {});
		});
	}
	DeleteUserInterests(interest:any){
		interest.forEach((item: any) => {
			this.interestService.deleteInterest(item.id_label).subscribe(res => {})
		})
	}
}

