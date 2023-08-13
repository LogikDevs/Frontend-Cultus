import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../posts/post.model';

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
        const idToNum = Number(this.userId);
        if (this.comment.user.id == idToNum) this.ownComment = true;
    }

    displayOptions(event: Event){
        event.stopPropagation(); 
        this.displayedOptions = !this.displayedOptions;
    }

    onRemoving() {
        this.commentVisibility=false;
    }
}
