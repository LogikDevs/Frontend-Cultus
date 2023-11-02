import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

	private urlGroups:string ="http://localhost:8002/api/v1/group";
	private urlJoinGroup:string="http://localhost:8002/.........";
  	constructor(private http: HttpClient) {}

	createGroup(groupToCreate:any) {
		const formData = new FormData();

		formData.append('name', groupToCreate.name);
		formData.append('description', groupToCreate.description);
		if (groupToCreate.multimedia_file) formData.append('picture', groupToCreate.multimedia_file);
		formData.append('privacy', groupToCreate.Type);
		const httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			}),
			observe: "response" as 'body'
		}
		return this.http.post(this.urlGroups, formData, httpOptions);
	}
	getGroups(){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlGroups, httpOptions);
	}
	joinGroup(){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			}),
			observe: "response" as 'body'
		}
		return this.http.post(this.urlJoinGroup, httpOptions)
	}
}
