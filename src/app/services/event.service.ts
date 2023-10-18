import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  	private urlCreateEvent = "http://localhost:8003/api/v1/event/create";

  	constructor(private http: HttpClient) { }
  
  	createEvent(eventToCreate:any) {
		const formData = new FormData();

		formData.append('name', eventToCreate.name);
		formData.append('description', eventToCreate.description);
		formData.append('text', eventToCreate.text);
		formData.append('start_date', eventToCreate.start_date);
		formData.append('end_date', eventToCreate.end_date);
		formData.append('cover', eventToCreate.cover);
		formData.append('private', eventToCreate.private);
		
		const httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			}),
			observe: "response" as 'body'
		}
		
		return this.http.post(this.urlCreateEvent, formData, httpOptions);
	}
}
