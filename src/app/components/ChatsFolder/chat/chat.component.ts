import { Component, Input } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

    @Input() chatId:any;
    chatData:any;
        
    message: string = '';

    constructor(
        private chatService: ChatService
    ){}

    ngOnInit(){
        this.bringGroupChat(this.chatId);
    }
    
    bringGroupChat(id_chat:any){
		this.chatService.BringChat(id_chat).subscribe((res:any)=>{
			this.chatData = res;
			console.log(this.chatData);
		})
	}    
    sendMessage(){

    }
}
