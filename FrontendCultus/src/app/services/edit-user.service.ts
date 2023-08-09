import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetUserService } from './get-user.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class EditUserService {
	userId:any = localStorage.getItem("IdUser");
	UserData:any;

	private urlApiEditUser = "http://localhost:8000/api/v1/user/";
	constructor(private http: HttpClient, private userService: GetUserService, private router: Router) {}
	
	getEditUser(UserData:any, EditUserData: any) {
		const body:any = {
			email: UserData.email,
			name: UserData.name,
			surname: UserData.surname,
			age: UserData.age,
			password: UserData.password
		}
		const FinalBodyEditedInfo = Object.assign({}, body, EditUserData);
		console.log(FinalBodyEditedInfo);
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		this.http.put(this.urlApiEditUser + this.userId, FinalBodyEditedInfo, httpOptions).subscribe((res: any) => {
			console.log(res);
		});
		//this.router.navigateByUrl('/SelectInterest');
	}
	sendEditUser(body: any) {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		this.http.put(this.urlApiEditUser + body.id, body, httpOptions).subscribe((res: any) => { });
		this.router.navigateByUrl('/SelectInterest');
	}
}
