import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
    @Input() message:any;
    
    @Input() userId:any;

    ownMessage:boolean;

    ngOnInit(){
      	if (this.message.sender.id === this.userId) this.ownMessage = true;  
    }
}
