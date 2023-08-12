import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../posts/post.model';
import { GetUserService } from 'src/app/services/get-user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
	@Input() comment: Comment;
  @Input() author: any;
  commentVisibility:boolean = true;
  commentId:any;
  userId:any = localStorage.getItem("IdUser");
  ownComment:boolean = false;
  displayedOptions:boolean = false;
  constructor() { }

    ngOnInit(){
        this.checkAuthor();
        this.commentId = this.comment.id_comment;
    }
    checkAuthor(){
        if (this.comment.fk_id_user == this.userId) this.ownComment = true;
    }

    displayOptions(event: Event){
        event.stopPropagation(); 
        this.displayedOptions = !this.displayedOptions;
    }

    onRemoving() {
        this.commentVisibility=false;
    }
}
