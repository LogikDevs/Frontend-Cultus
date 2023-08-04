import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interest, UserInterests } from '../components/InterestsFolder/interest/interest.model';

@Injectable({
  providedIn: 'root'
})
export class GetInterestsService {
  	private urlGetInterests = 'http://localhost:8000/api/v1/interest';
  	private urlSendInterests = 'http://localhost:8000/api/v1/likes';
	private urlGetUserInterests = 'http://localhost:8000/api/v1/likes/user/'
	
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
	sendInterests(User:any, Interests:any){
		const body = {
			id_interest: Interests,
			id_user: User
		}
		return this.http.post<UserInterests[]>(this.urlSendInterests, body);
	}
	getUserInterests(userId:any){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlGetUserInterests+userId, httpOptions);
	}
}
