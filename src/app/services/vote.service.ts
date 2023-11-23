import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLs } from 'src/app/common/globalVariables';

@Injectable({
	providedIn: 'root'
})
export class VoteService {
	private urlCreateVote = API_URLs.POSTS+'/api/v1/votes/create';
	private urlUpdateVotes = API_URLs.POSTS+'/api/v1/posts/list/';
	private urlDeleteVote = API_URLs.POSTS+'/api/v1/votes/delete/';
	private urlUserVotes= API_URLs.POSTS+'/api/v1/votes/listUser/';
	constructor(private http: HttpClient) { }

	voteCreate(postIdReceived: any, votetype: any) {
		const body = {
			fk_id_post: postIdReceived,
			vote: votetype
		}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			}),
			observe: "response" as 'body'
		}
		return this.http.post(this.urlCreateVote, body, httpOptions);
	}
	voteDelete(voteId:any){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.post(this.urlDeleteVote+voteId, httpOptions);
	}
	updateVotes(fk_id_post:any){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlUpdateVotes+fk_id_post, httpOptions);
	}
	checkUserVotes(){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlUserVotes, httpOptions);
	}
}
