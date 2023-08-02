import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetUserService } from './get-user.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class EditUserService {
	private urlApiEditUser = "http://localhost:8000/api/v1/user/";
	UserId = localStorage.getItem("IdUser");
	constructor(private http: HttpClient, private api: GetUserService, private router: Router) {
	}

	getEditUser(EditUserData: any) {
		this.api.getUserFromId(this.UserId).subscribe((res: any) => {
			const body = {
				homeland: EditUserData.homeland,
				residence: EditUserData.residenceCountry,
				gender: EditUserData.gender,
				profile_pic: EditUserData.profile_pic,
				description: EditUserData.description
			}
			this.sendEditUser(body);
		});
	}
	sendEditUser(body: any) {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		this.http.put(this.urlApiEditUser + this.UserId, body, httpOptions).subscribe((res: any) => { });
		this.router.navigateByUrl('/selectInterest');
	}
}
