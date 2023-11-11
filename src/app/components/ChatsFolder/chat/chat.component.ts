import { Component, Input } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { GetUserService } from 'src/app/services/get-user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

    @Input() chatId:any;
    chatData:any;
    
    chatMessages:any = [];
    ownMessageSent:any = [];

    userId:any;

    message: string = '';

    constructor(
        private chatService: ChatService,
        private userService: GetUserService
    ){}

    ngOnChanges(){
        this.ownMessageSent = [];
        this.getUser();
        this.getChat();
    }

    getChat(){
        this.bringGroupChat(this.chatId);
        this.bringChatMessages(this.chatId);
    }

    getUser(){
        this.userService.getUser().subscribe((res:any)=>{
            this.userId = res.id;
        })
    }

    bringGroupChat(id_chat:any){
		this.chatService.BringChat(id_chat).subscribe((res:any)=>{
			this.chatData = res;
		})
	}

    bringChatMessages(id_chat:any){
        this.chatService.BringChatMessages(id_chat).subscribe((res:any)=>{
            this.chatMessages = res.data;
        })
    }

    sendMessage(){
        this.chatService.SendMessage(this.message, this.chatId).subscribe((res:any)=>{
            this.message = "";
            this.ownMessageSent.push(res);
        })
    }
}
