import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../posts/post.model';
import { GetUserService } from 'src/app/services/get-user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
  @Input() author: any;
	@Input() comment: Comment;

  userId:any = localStorage.getItem("IdUser");
  
  commentId:any;
  ownComment:boolean = false;

  commentVisibility:boolean = true;
  displayedOptions:boolean = false;

  constructor(private userService: GetUserService) { }

    ngOnInit(){
        this.getWriter();
        this.checkAuthor();
        this.commentId = this.comment.id_comment;
    }
  
    getWriter() {
		this.userService.getUserFromId(this.comment.fk_id_user).subscribe((res: any) => {
			this.author = res.name + " " + res.surname;
		});
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
