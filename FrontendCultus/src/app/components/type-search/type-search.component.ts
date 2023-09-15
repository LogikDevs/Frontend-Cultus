import { Component } from '@angular/core';
import { GetInterestsService } from 'src/app/services/get-interests.service';
import { GetPostsService } from 'src/app/services/get-posts.service';

@Component({
  selector: 'app-type-search',
  templateUrl: './type-search.component.html',
  styleUrls: ['./type-search.component.scss']
})
export class TypeSearchComponent {

    buttonPosts = document.getElementById('btnPosts');
    buttonUsers = document.getElementById('btnUsers');
    buttonInterests = document.getElementById('btnInterests');

	typeSearchVariable:any = "users" || "posts" || "interests";
	AllUsers:any;
	AllPosts:any;
	AllInterests:any;
	filteredResults:any;
    constructor(private interestService: GetInterestsService, private postService: GetPostsService) { }

	ngOnInit(){
		this.RequestInformation();
	};
	RequestInformation(){
		this.postService.getPosts().subscribe((res:any)=>{
			this.AllPosts = res;
		})
		this.interestService.getInterests().subscribe((res:any)=>{
			this.AllInterests = res;
		});
	}
    filterType(type:any = "users" || "posts" || "interests"){
		this.typeSearchVariable = type;
    }
    onSearch(data:Event){
	  	const ReceivedText = (data.target as HTMLInputElement).value.toLowerCase();
    
	  	if (ReceivedText.length >= 2) this.typeData(ReceivedText);
	  }
    typeData(dataReceived: string) {
		console.log(this.typeSearchVariable);
		if (this.typeSearchVariable == "users") {
			this.filteredResults = this.AllUsers.filter((result:any) =>
			result.name.toLowerCase().startsWith(dataReceived.toLowerCase())
		)
		}
		if (this.typeSearchVariable == "posts") {
			this.filteredResults = this.AllPosts.filter((result:any) =>
				result.text.toLowerCase().startsWith(dataReceived.toLowerCase())
			)
		}
		if (this.typeSearchVariable == "interests") {
			this.filteredResults = this.AllInterests.filter((result:any) =>
				result.interest.toLowerCase().startsWith(dataReceived.toLowerCase())
			)
		}
	}

}
