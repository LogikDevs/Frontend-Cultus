import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
	providedIn: 'root'
})

export class GetUserService {
	private urlgetUser = 'http://localhost:8000/api/v1/validate';
	private urlUserProfile = 'http://localhost:8000/api/v1/user/profile/'
	


	private constructor(private http: HttpClient) {  }

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
}