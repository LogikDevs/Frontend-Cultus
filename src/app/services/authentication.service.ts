import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {API_URLs} from "src/app/common/globalVariables";

@Injectable({
	providedIn: 'root'   
})
export class AuthenticationService {
	private loginUrl = API_URLs.AUTH+"oauth/token";
	private logoutUrl = API_URLs.AUTH+"api/v1/logout";
	private client = API_URLs.client;
	private secret = API_URLs.secret;

	constructor(private http: HttpClient) { }

	sendLogin(credentials: any) {
		const body = {
			grant_type: "password",
			client_id: this.client,
			client_secret: this.secret,
			username: credentials.email,
			password: credentials.password
		}
		return this.http.post(this.loginUrl, body);
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
