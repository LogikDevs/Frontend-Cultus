import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
	providedIn: 'root'
})

export class GetUserService {
	private urlgetUser = 'http://localhost:8000/api/v1/validate';
	private urlUserProfile = 'http://localhost:8000/api/v1/user/profile/'
	
	user:any = "IdUser";
	profileKey:any = "userData";

	private constructor(private http: HttpClient) {  }
	
	getUserData(): any {
		const cachedData = localStorage.getItem(this.profileKey);
		return cachedData ? JSON.parse(cachedData) : null;
	}
	getProfile(user:any){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlUserProfile + user, httpOptions);
	}
	UserIdIntoStorage(){
        this.getUser().subscribe((res:any)=>{
            localStorage.setItem(this.user, (res["id"]));
			localStorage.setItem(this.profileKey, JSON.stringify(res));
        });
    }
	getUser() {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlgetUser, httpOptions);
	}
}