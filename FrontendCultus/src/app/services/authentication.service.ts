import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private loginUrl = "http://localhost:8000/oauth/token";
	private logoutUrl = "http://localhost:8000/api/v1/logout";
	private client = "101";
	private secret = "M4W9BFpI1Dkf2s9R1Le1W3YApcN2iZUWfokfYpyI";
	constructor(private http: HttpClient) { }

	sendLogin(credentials: any) {
		const body = {
			grant_type: "password",
			client_id: this.client,
			client_secret: this.secret,
			username: credentials.email,
			password: credentials.password
		}
		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		}
		return this.http.post(this.loginUrl, body, httpOptions);
	}
	sendLogout() {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.logoutUrl, httpOptions);
	}
}
