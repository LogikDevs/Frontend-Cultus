import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {API_URLs} from "src/app/common/globalVariables";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

	urlGetChat:string=API_URLs.GROUPS+"/api/v1/chat/";
	urlGetChatMessages:string=API_URLs.GROUPS+"/api/v1/chat/"
	urlSendMessage:string=API_URLs.GROUPS+"/api/v1/message";
	urlCreatePrivateChat:string=API_URLs.GROUPS+"/api/v1/chat/direct/"
	urlGetPrivateConversations:string=API_URLs.GROUPS+"/api/v1/chat/get/direct/";

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
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlGetChatMessages + id_chat, httpOptions)
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
	createPrivateChat(id_user:number){
		const body = {
			id_user: id_user
		}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.post(this.urlCreatePrivateChat, body, httpOptions);
	}
	getUserPrivateConversations(){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlGetPrivateConversations, httpOptions);
	}
	getExistingChat(id_user:any){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlGetPrivateConversations+id_user, httpOptions);
	}
	BringConversation(id_user:any){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlGetChatMessages+id_user, httpOptions);
	}
}
