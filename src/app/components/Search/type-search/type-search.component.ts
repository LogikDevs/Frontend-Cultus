import { Component } from '@angular/core';
import { NotFoundError } from 'rxjs';
import { GetInterestsService } from 'src/app/services/get-interests.service';
import { GetPostsService } from 'src/app/services/get-posts.service';
import { GetUserService } from 'src/app/services/get-user.service';

@Component({
	selector: 'app-type-search',
	templateUrl: './type-search.component.html',
	styleUrls: ['./type-search.component.scss']
})
export class TypeSearchComponent {

	buttonPosts = document.getElementById('btnPosts');
	buttonUsers = document.getElementById('btnUsers');
	buttonInterests = document.getElementById('btnInterests');

	typeSearchVariable: any = "users" || "posts" || "interests";

	AllInterests: any;

	filteredData: any[] = [];

	nothingFoundMsg = {
		notFoundUser: "No User was found.",
		notFoundInterest: "No interest was found."
	}

	SearchNotFound: any = "";

	constructor(
		private interestService: GetInterestsService,
		private userService: GetUserService
	) { }

	ngOnInit() {
		this.RequestInformation();
	}

	RequestInformation() {
		this.interestService.getInterests().subscribe((res: any) => {
			this.AllInterests = res;
		});
	}

	filterType(type: any = "users" || "interests") {
		this.typeSearchVariable = type;
		this.filteredData = [];
		this.SearchNotFound = "";
	}

	onSearch(data: Event) {
		const ReceivedText = (data.target as HTMLInputElement).value.toLowerCase();

		if (ReceivedText.length >= 2) this.typeData(ReceivedText);

		if (ReceivedText.length < 2) {
			this.filteredData = [];
			this.SearchNotFound = "";
		}
	}

	typeData(dataReceived: string) {
		if (this.typeSearchVariable == "users") {

			this.userService.getUsersBySearch(dataReceived).subscribe((res: any) => {
				this.filteredData = res;

				if (this.filteredData.length == 0) this.InCaseNoResults();

				if (this.filteredData.length > 0) this.SearchNotFound = "";
			})
		}
		if (this.typeSearchVariable == "interests") {

			this.filteredData = this.AllInterests.filter((result: any) =>
				result.interest.toLowerCase().startsWith(dataReceived.toLowerCase())
			)
			if (this.filteredData.length == 0) this.InCaseNoResults();

			if (this.filteredData.length > 0) this.SearchNotFound = "";
		}
	}
	InCaseNoResults() {
		if (this.typeSearchVariable === "interests") this.SearchNotFound = this.nothingFoundMsg.notFoundInterest;

		if (this.typeSearchVariable === "users") this.SearchNotFound = this.nothingFoundMsg.notFoundUser;
	}
}
