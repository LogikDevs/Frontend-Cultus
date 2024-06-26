import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URLs } from 'src/app/common/globalVariables';
@Injectable({
	providedIn: 'root'
})
export class PostLoginService {
	private urlAuthenticationAPI: string = API_URLs.AUTH+'/api/v1/user';

	constructor(private http: HttpClient) { }

	PostLogin(inputdata: any) {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.post(this.urlAuthenticationAPI, inputdata, httpOptions);
	}
}
