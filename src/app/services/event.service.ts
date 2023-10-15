import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  	private urlCreateEvent = "http://localhost:8003/api/v1/event/create";

  	constructor(private http: HttpClient) { }
  
  	createEvent(eventToCreate:any) {
    	const body = {
			name: eventToCreate.name,
			text: eventToCreate.description,
			start_date: eventToCreate.InitDate,
			end_date: eventToCreate.CloseDate,
			multimedia_file: eventToCreate.multimedia_file,
			private: eventToCreate.Type,
    	}
		const httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			}),
			observe: "response" as 'body'
		}
		
		return this.http.post(this.urlCreateEvent, body, httpOptions);
	}
}
