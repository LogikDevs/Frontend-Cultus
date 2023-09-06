import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FollowsService {
  private urlSendFollow = "http://localhost:8000/api/v1/follow";
  private urlUnfollow = "http://localhost:8000/api/v1/unfollow";
  private urlUserFollowed = "http://localhost:8000/api/v1/followeds/"

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
