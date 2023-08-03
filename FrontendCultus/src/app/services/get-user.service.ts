import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
	providedIn: 'root'
})

export class GetUserService {
	private urlgetUser = 'http://localhost:8000/api/v1/validate';
	private urlUserInterests = "http://localhost:8000/api/v1/likes/user/";
	private urlUserFromId = 'http://localhost:8000/api/v1/user/'
	private urlUserCountries = 'http://localhost:8000/api/v1/country/'
	
	profileKey:any = "userData";

	private constructor(private http: HttpClient) {  }
	
	getUserData(): any {
		const cachedData = localStorage.getItem(this.profileKey);
		return cachedData ? JSON.parse(cachedData) : null;
	}

	UserIdIntoStorage(){
        this.getUser().subscribe((res:any)=>{
            localStorage.setItem('IdUser', (res["id"]));
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
	getUserFromId(userId: any) {
		return this.http.get(this.urlUserFromId + userId);
	}
	getUserCountry(idCountry:any){
		return this.http.get(this.urlUserCountries+idCountry);
	}
	getUserInterests(IDinserted: any) {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		};
		return this.http.get(this.urlUserInterests + IDinserted, httpOptions);
	}
}