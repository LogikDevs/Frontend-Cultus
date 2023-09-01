import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class EditUserService {
	private urlApiRegisterOptionalData = "http://localhost:8000/api/v1/user/2";
	private urlApiEditUser = "http://localhost:8000/api/v1/user/";
  
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
		formData.append('password', EditUserData.password);

		if(EditUserData.homeland != "") formData.append('homeland', EditUserData.homeland);

		if(EditUserData.residence_country != "") formData.append('residence', EditUserData.residence_country);

		if(EditUserData.gender != "") formData.append('gender', EditUserData.gender);

		if(EditUserData.description != "") formData.append('description', EditUserData.description);

		if(EditUserData.profile_pic != undefined) formData.append('profile_pic', EditUserData.profile_pic);
		
		const httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.put(this.urlApiEditUser, formData, httpOptions);
	}
}
