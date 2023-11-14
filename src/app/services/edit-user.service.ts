import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {API_URLs} from "src/app/common/globalVariables";

@Injectable({
	providedIn: 'root'
})
export class EditUserService {
	private urlApiRegisterOptionalData = API_URLs.AUTH+"api/v1/user/2";
	private urlApiEditUser = API_URLs.AUTH+"api/v1/user/edit";
  
	constructor(private http: HttpClient) {}
	
	getEditUser(EditUserData: any) {

		const formData = new FormData();
		if(EditUserData.homeland != "") formData.append('homeland', EditUserData.homeland);

		if(EditUserData.residence_country != "") formData.append('residence', EditUserData.residence_country);

		if(EditUserData.gender != "") formData.append('gender', EditUserData.gender);

		if(EditUserData.description != "") formData.append('description', EditUserData.description);

		if(EditUserData.profile_pic != undefined) formData.append('profile_pic', EditUserData.profile_pic);
		
		const httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			}), 
			observe: "response" as 'body'
		}
		return this.http.post(this.urlApiRegisterOptionalData, formData, httpOptions);
	}

	ProfileEditUser(EditUserData: any) {
		
		const formData = new FormData();
		
		formData.append('name', EditUserData.name);
		formData.append('surname', EditUserData.surname);
		formData.append('email', EditUserData.email);
		formData.append('age', EditUserData.age);

		if(EditUserData.homeland != "") formData.append('homeland', EditUserData.homeland);

		if(EditUserData.residence_country != "") formData.append('residence', EditUserData.residence_country);

		if(EditUserData.gender != "") formData.append('gender', EditUserData.gender);

		if(EditUserData.description != "") formData.append('description', EditUserData.description);

		if(EditUserData.profile_pic != undefined) formData.append('profile_pic', EditUserData.profile_pic);
		
		const httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			}),
			observe: "response" as 'body'
		}
		return this.http.post(this.urlApiEditUser, formData, httpOptions);
	}
}
