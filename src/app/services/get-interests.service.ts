import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interest, UserInterests } from '../components/InterestsFolder/interest/interest.model';
import { API_URLs } from '../common/globalVariables';

@Injectable({
  providedIn: 'root'
})
export class GetInterestsService {
  	private urlGetInterests = API_URLs.AUTH+'/api/v1/interest';
  	private urlSendInterests = API_URLs.AUTH+'/api/v1/likes/';
	private urlGetUserInterests = API_URLs.AUTH+'/api/v1/likes/user/'
	private urlSendPostInterests = API_URLs.POSTS+'/api/v1/characterizes/create';

	public displaySelectInterest:boolean = false;

	NewUserInterestsArray:any[] = [];

	constructor(private http: HttpClient) { }
	
	getInterests(): Observable<Interest[]> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.get<Interest[]>(this.urlGetInterests, httpOptions);
	}
	sendUserInterests(Interests:any){
		const body = {
			id_interest: Interests
		}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.post<UserInterests[]>(this.urlSendInterests, body, httpOptions);
	}
	sendPostInterests(Post:any, Interests:any){
		const body = {
			fk_id_label: Interests,
			fk_id_post: Post
		}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.post(this.urlSendPostInterests, body, httpOptions);
	}
	deleteInterest(IdInterest:any){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.delete(this.urlSendInterests+IdInterest, httpOptions);
	}
	getUserInterests(){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlGetUserInterests, httpOptions);
	}
}
