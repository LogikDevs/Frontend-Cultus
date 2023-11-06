import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

	urlGetChat:string="http://localhost:8002/api/v1/chat/";
	urlGetChatMessages:string="http://localhost:8002/api/v1/chat/"
	urlSendMessage:string="http://localhost:8002/api/v1/message";

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
	BringChatMessages(id_chat:any){
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
		})
		return this.http.get(this.urlGetChatMessages + id_chat)
	}
	SendMessage(messageToSend:any, id_chat:any){
		const body = {
			id_chat: id_chat,
			text: messageToSend
		}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.post(this.urlSendMessage, body, httpOptions);
	}
}
