import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLs } from '../common/globalVariables.ts.example';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

	private urlGroups:string =API_URLs.GROUPS+"/api/v1/group/";
	private urlMyGroups:string =API_URLs.GROUPS+"/api/v1/chats/";
	private urlJoinGroup:string=API_URLs.GROUPS+"/api/v1/group/join/";
	private urlLeaveGroup:string=API_URLs.GROUPS+"/api/v1/leave/"
	private urlGetParticipants:string=API_URLs.GROUPS+"/api/v1/integrates/"
	
  	constructor(private http: HttpClient) {}

	createGroup(groupToCreate:any) {
		const formData = new FormData();

		formData.append('name', groupToCreate.name);
		formData.append('description', groupToCreate.description);
		formData.append('privacy', groupToCreate.Type);
		
		if (groupToCreate.multimedia_file) formData.append('picture', groupToCreate.multimedia_file);
		
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
	getMyGroups(){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlMyGroups, httpOptions);
	}
	joinGroup(id_group:any){
		const body = {
			id_group: id_group
		}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			}),
			observe: "response" as 'body'
		}
		return this.http.post(this.urlJoinGroup, body , httpOptions)
	}
	leaveGroup(id_group:any){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			}),
			observe: "response" as 'body'
		}
		return this.http.get(this.urlLeaveGroup + id_group, httpOptions)
	}
	getGroupData(groupId:any){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlGroups + groupId, httpOptions)
	}
	getGroupParticipants(id_group:any){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlGetParticipants + id_group, httpOptions)
	}
}
