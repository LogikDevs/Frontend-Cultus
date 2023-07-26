import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class VoteService {
	private urlCreateVote = 'http://localhost:8001/api/votes/create';
	private urlUpdateVotes = 'http://localhost:8001/api/post/listPost/';
	constructor(private http: HttpClient) { }

	voteCreate(postIdReceived: any, UserIdReceived: any, votetype: any) {
		const body = {
			fk_id_user: UserIdReceived,
			fk_id_post: postIdReceived,
			vote: votetype
		}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.post(this.urlCreateVote, body, httpOptions);
	}
	updateVotes(fk_id_post:any){
		return this.http.get(this.urlUpdateVotes+fk_id_post);
	}
}
