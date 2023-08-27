import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
	providedIn: 'root'
})
export class EditUserService {

	private urlApiEditUser = "http://localhost:8000/api/v1/user/";
	constructor(private http: HttpClient) {}
	
	getEditUser(EditUserData: any) {
		const userId = localStorage.getItem("IdUser");

		const formData = new FormData();
		if(EditUserData.homeland != "") formData.append('homeland', EditUserData.homeland);

		if(EditUserData.residence_country != "") formData.append('residence', EditUserData.residence_country);

		if(EditUserData.gender != "") formData.append('gender', EditUserData.gender);

		if(EditUserData.description != "") formData.append('description', EditUserData.description);

		if(EditUserData.profile_pic != undefined) formData.append('profile_pic', EditUserData.profile_pic);
		
		return this.http.post(this.urlApiEditUser + userId, formData, { observe: 'response' });
	}
}
