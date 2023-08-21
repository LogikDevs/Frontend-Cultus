import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetUserService } from './get-user.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class EditUserService {
	userId:any = localStorage.getItem("IdUser");

	private urlApiEditUser = "http://localhost:8000/api/v1/user/";
	constructor(private http: HttpClient, private router: Router) {}
	
	getEditUser(EditUserData: any) {
		console.log('EditUserData: ',EditUserData);
		const formData = new FormData();
		formData.append('profile_pic', EditUserData.profile_pic);
		formData.append('homeland', EditUserData.homeland);
		formData.append('residence', EditUserData.residence_country);
		formData.append('gender', EditUserData.gender);
		formData.append('description', EditUserData.description);
		console.log('formData', formData);
		const httpOptions = {
			headers: new HttpHeaders({
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		this.http.post(this.urlApiEditUser + this.userId, formData, httpOptions).subscribe((res: any) => {
			console.log(res);
		});
		this.router.navigateByUrl('/SelectInterest');
	}
}
