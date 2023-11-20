import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { API_URLs } from '../common/globalVariables.ts.example';
@Injectable({
	providedIn: 'root'
})

export class GetUserService {
	private urlgetUser = API_URLs.AUTH+'/api/v1/validate';
	private urlUserProfile = API_URLs.AUTH+'/api/v1/user/profile/'
	private urlSearchUser = API_URLs.AUTH+"/api/v1/user/search";

	constructor(private http: HttpClient) {  }

	getProfile(user:any){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlUserProfile + user, httpOptions);
	}

	getUser() {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlgetUser, httpOptions);
	}
	getUsersBySearch(dataReceived:any){
		const body = {
			name: dataReceived.name,
			surname: dataReceived.surname
		}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.post(this.urlSearchUser, body,httpOptions);
	}
}