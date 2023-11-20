import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLs } from '../common/globalVariables.ts.example';

@Injectable({
	providedIn: 'root'
})
export class GetCountriesService {
	private urlCountries = API_URLs.AUTH+"/api/v1/country";

	constructor(private http: HttpClient) { }

	getCountries() {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlCountries, httpOptions);
	}
}
