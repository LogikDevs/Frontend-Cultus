import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {API_URLs} from "src/app/common/globalVariables";
@Injectable({
  providedIn: 'root'
})
export class FollowsService {
  private urlSendFollow = API_URLs.AUTH+"api/v1/follow";
  private urlUnfollow = API_URLs.AUTH+"api/v1/unfollow";
  private urlUserFollowed = API_URLs.AUTH+"api/v1/followeds/"

  constructor(private http: HttpClient) { }

  sendFollow(idFollowed:any) {
    	const body = {
    	  id_followed: idFollowed
    	}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		};
		return this.http.post(this.urlSendFollow, body, httpOptions);
	}
  	Unfollow(idFollowed:any) {
    	const body = {
    	  	id_followed: idFollowed
    	}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.post(this.urlUnfollow, body, httpOptions);
	}
  	getUserFollowedAccounts(){
    	const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
    	return this.http.get(this.urlUserFollowed, httpOptions);
  	}
}
