import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

	private urlCreateGroup:string ="http://localhost:8002/api/v1/group";

  	constructor(private http: HttpClient) {}

	createGroup(groupToCreate:any) {
		const formData = new FormData();

		formData.append('name', groupToCreate.name);
		formData.append('description', groupToCreate.description);
		formData.append('picture', groupToCreate.multimedia_file);
		formData.append('privacy', groupToCreate.Type);
		const httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			}),
			observe: "response" as 'body'
		}
		
		return this.http.post(this.urlCreateGroup, formData, httpOptions);
	}
}
