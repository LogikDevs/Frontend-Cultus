import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetCommentsService } from 'src/app/services/get-comments.service';

@Component({
  selector: 'app-modal-option-comment',
  templateUrl: './modal-option-comment.component.html',
  styleUrls: ['./modal-option-comment.component.scss']
})
export class ModalOptionCommentComponent {
  	@Input() ownComment:boolean;
  	@Input() commentId:any;
  	@Output() CommentRemoved = new EventEmitter<boolean>();
  	@Input() optionVisibility:boolean;
  	
	constructor(private commentService: GetCommentsService){}

  	removeComment(){
      	this.commentService.deleteComment(this.commentId).subscribe((res:any)=>{
    		this.CommentRemoved.emit(true);
			this.optionVisibility = false;
      	})
  	}
  	reportComment(){
		console.log("Reported.");
		this.optionVisibility = false;
  	}
	hideComponent(){
		this.optionVisibility = false;
	}
}
