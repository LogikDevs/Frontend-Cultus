import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

	urlGetChat:string="http://localhost:8002/api/v1/chat/";

  	constructor(private http: HttpClient) { }

  	BringChat(id:any){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlGetChat + id, httpOptions);
  	}
}
