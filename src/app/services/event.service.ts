import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLs } from '../common/globalVariables.ts.example';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  	private urlCreateEvent = API_URLs.EVENTS+"/api/v1/event/create";
	private urlSendEventInterests = API_URLs.EVENTS+"/api/v1/event/interests/create";
	private urlGetEventsFromInterests = API_URLs.EVENTS+"/api/v1/event/interested";
	private urlGetFollowedEvents = API_URLs.EVENTS+"/api/v1/event/followed";
	private urlFollowEvent = API_URLs.EVENTS+"/api/v1/participant/create";
	private urlUnfollowEvent = API_URLs.EVENTS+"/api/v1/participant/delete";
	private urlEventData = API_URLs.EVENTS+"/api/v1/events/";

  	constructor(private http: HttpClient) { }
	
  	createEvent(eventToCreate:any) {
		const formData = new FormData();

		formData.append('name', eventToCreate.name);
		formData.append('text', eventToCreate.text);
		formData.append('start_date', eventToCreate.start_date);
		formData.append('end_date', eventToCreate.end_date);
		formData.append('private', eventToCreate.private);

		if (eventToCreate.cover != undefined) formData.append('cover', eventToCreate.cover);
		if (eventToCreate.description != undefined) formData.append('description', eventToCreate.description);
		
		const httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			}),
			observe: "response" as 'body'
		}
		
		return this.http.post(this.urlCreateEvent, formData, httpOptions);
	}
	sendEventInterests(interestId:any, eventId:any){
		const body = {
			fk_id_event: eventId,
			fk_id_label: interestId
		}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			}),
			observe: "response" as 'body'
		}
		return this.http.post(this.urlSendEventInterests, body, httpOptions)
	}

	getEventsFromInterests(){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlGetEventsFromInterests, httpOptions);
	}

	getUserFollowedEvents(){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlGetFollowedEvents, httpOptions);
	}

	getEventData(eventId:any){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlEventData + eventId, httpOptions);
	}


	followEvent(id_event:any){
		const body = {
			fk_id_event: id_event
		}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.post(this.urlFollowEvent, body, httpOptions);
	}

	unfollowEvent(id_event:any){
		const body = {
			fk_id_event: id_event
		}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.post(this.urlUnfollowEvent, body, httpOptions);
	}
}
