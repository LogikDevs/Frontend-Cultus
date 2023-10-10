import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interest, UserInterests } from '../components/InterestsFolder/interest/interest.model';

@Injectable({
  providedIn: 'root'
})
export class GetInterestsService {
  	private urlGetInterests = 'http://localhost:8000/api/v1/interest';
  	private urlSendInterests = 'http://localhost:8000/api/v1/likes/';
	private urlGetUserInterests = 'http://localhost:8000/api/v1/likes/user/'
	private urlSendPostInterests = 'http://localhost:8001/api/v1/characterizes/create';

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