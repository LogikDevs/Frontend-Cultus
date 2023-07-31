import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetUserService } from './get-user.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class EditUserService {
	private urlApiEditUser = "http://localhost:8000/api/v1/user/";
	constructor(private http: HttpClient, private api: GetUserService, private router: Router) {
	}

	getEditUser(EditUserData: any) {
		this.api.getUser().subscribe((res: any) => {
			const body = {
				id: res.id,
				name: res.name,
				surname: res.surname,
				age: res.age,
				email: res.email,
				password: res.password,
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
		this.http.put(this.urlApiEditUser + body.id, body, httpOptions).subscribe((res: any) => { });
		this.router.navigateByUrl('/selectInterest');
	}
}
