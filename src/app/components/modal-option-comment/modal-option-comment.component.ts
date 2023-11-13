import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetCommentsService } from 'src/app/services/get-comments.service';

@Component({
	selector: 'app-modal-option-comment',
	templateUrl: './modal-option-comment.component.html',
	styleUrls: ['./modal-option-comment.component.scss']
})
export class ModalOptionCommentComponent {
	@Input() ownComment: boolean;
	@Input() commentId: any;
	
	@Input() optionVisibility: boolean;

	@Output() CommentRemoved = new EventEmitter<boolean>();

	constructor(private commentService: GetCommentsService) { }

	removeComment() {
		this.commentService.deleteComment(this.commentId).subscribe((res: any) => {
			this.CommentRemoved.emit(true);
			this.optionVisibility = false;
		})
	}
	reportComment() {
		this.optionVisibility = false;
	}
	hideComponent() {
		this.optionVisibility = false;
	}
}
