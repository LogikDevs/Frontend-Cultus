import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class PostRegisterService {
	private urlAuthenticationAPI = 'http://localhost:8000/api/v1/user';

	private constructor(private http: HttpClient) { }

	PostRegister(credentials: any) { 
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			}), 
			observe: "response" as 'body'
		}
		return this.http.post(this.urlAuthenticationAPI, credentials, httpOptions );
	}
}

